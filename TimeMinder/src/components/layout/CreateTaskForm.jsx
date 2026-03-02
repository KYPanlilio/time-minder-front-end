import React, { useState } from 'react';
import '../../css/CreateTaskForm.css';

const CreateTaskForm = ({ addTask }) => {
	const [form, setForm] = useState({
		deadline: '',
		title: '',
		description: '',
		type: 'Habit',
		habitLink: '',
		repeat: [],
		until: '',
	});

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		if (type === 'checkbox' && name.startsWith('repeat-')) {
			setForm(f => ({
				...f,
				repeat: checked
					? [...f.repeat, name.replace('repeat-', '')]
					: f.repeat.filter(day => day !== name.replace('repeat-', '')),
			}));
		} else {
			setForm(f => ({ ...f, [name]: value }));
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!form.title.trim()) return;
		addTask(form);
		setForm({
			deadline: '',
			title: '',
			description: '',
			type: 'Habit',
			habitLink: '',
			repeat: [],
			until: '',
		});
	};

	return (
		<form className="create-task-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="deadline">Deadline <span className="required">*</span></label>
				<input type="datetime-local" id="deadline" name="deadline" className="form-input" value={form.deadline} onChange={handleChange} />
			</div>
			<div className="form-group">
				<label htmlFor="title">Title <span className="required">*</span></label>
				<input type="text" id="title" name="title" className="form-input" value={form.title} onChange={handleChange} />
			</div>
			<div className="form-group">
				<label htmlFor="description">Description <span className="required">*</span></label>
				<textarea id="description" name="description" className="form-input" rows={3} value={form.description} onChange={handleChange}></textarea>
			</div>
			<div className="form-group">
				<label htmlFor="type">Type <span className="required">*</span></label>
				<select id="type" name="type" className="form-input" value={form.type} onChange={handleChange}>
					<option value="Habit">Habit</option>
					<option value="Task">Task</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="habit-link">Link a Habit</label>
				<select id="habit-link" name="habit-link" className="form-input" value={form.habitLink} onChange={handleChange}>
				</select>
			</div>
			<div className="form-group repeat-group">
				<label>Repeat Every</label>
				<div className="repeat-checkboxes">
					{['SUN','MON','TUE','WED','THU','FRI','SAT'].map(day => (
						<label key={day}>
							<input
								type="checkbox"
								name={`repeat-${day.toLowerCase()}`}
								checked={form.repeat.includes(day.toLowerCase())}
								onChange={handleChange}
							/> {day}
						</label>
					))}
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="until">Until</label>
				<input type="date" id="until" name="until" className="form-input" placeholder="dd/mm/yyyy" value={form.until} onChange={handleChange} />
			</div>
			<button type="submit" className="create-task-btn">Create Task</button>
		</form>
	);
};

export default CreateTaskForm;
