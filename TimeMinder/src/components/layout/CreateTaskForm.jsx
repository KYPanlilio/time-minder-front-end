import React from 'react';
import '../../css/CreateTaskForm.css';

const CreateTaskForm = () => {
	return (
		<form className="create-task-form">
			<div className="form-group">
				<label htmlFor="deadline">Deadline <span className="required">*</span></label>
				<input type="datetime-local" id="deadline" name="deadline" className="form-input" />
			</div>
			<div className="form-group">
				<label htmlFor="title">Title <span className="required">*</span></label>
				<input type="text" id="title" name="title" className="form-input" />
			</div>
			<div className="form-group">
				<label htmlFor="description">Description <span className="required">*</span></label>
				<textarea id="description" name="description" className="form-input" rows={3}></textarea>
			</div>
			<div className="form-group">
				<label htmlFor="type">Type <span className="required">*</span></label>
				<select id="type" name="type" className="form-input">
					<option value="Habit">Habit</option>
					<option value="Task">Task</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="habit-link">Link a Habit</label>
				<select id="habit-link" name="habit-link" className="form-input">
				</select>
			</div>
			<div className="form-group repeat-group">
				<label>Repeat Every</label>
				<div className="repeat-checkboxes">
					<label><input type="checkbox" name="repeat-sun" /> SUN</label>
					<label><input type="checkbox" name="repeat-mon" /> MON</label>
					<label><input type="checkbox" name="repeat-tue" /> TUE</label>
					<label><input type="checkbox" name="repeat-wed" /> WED</label>
					<label><input type="checkbox" name="repeat-thu" /> THU</label>
					<label><input type="checkbox" name="repeat-fri" /> FRI</label>
					<label><input type="checkbox" name="repeat-sat" /> SAT</label>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="until">Until</label>
				<input type="date" id="until" name="until" className="form-input" placeholder="dd/mm/yyyy" />
			</div>
			<button type="submit" className="create-task-btn">Create Task</button>
		</form>
	);
};

export default CreateTaskForm;
