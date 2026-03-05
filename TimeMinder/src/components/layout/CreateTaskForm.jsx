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

    const [errors, setErrors] = useState({});
    //validation logic for user inputs
    const validateForm = () => {
        const newErrors = {};

		if (!form.deadline) {
			newErrors.deadline = 'Deadline is required';
		}

        if (!form.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!form.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!form.type) {
            newErrors.type = 'Type is required';
        }

        if (form.deadline) {
            const deadlineDate = new Date(form.deadline);
            const now = new Date();
            if (deadlineDate < now) {
                newErrors.deadline = 'Deadline cannot be in the past';
            }
        }

        if (form.repeat.length > 0 && !form.until) {
            newErrors.until = 'Until date is required when repeat is selected';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    //user inputs 
    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

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

        if (!validateForm()) {
            return;
        }

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
        setErrors({});
    };

    return (
        <form className="create-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="deadline">
                    Deadline <span className="required">*</span>
                </label>
                <input
                    type="datetime-local"
                    id="deadline"
                    name="deadline"
                    className={`form-input ${errors.deadline ? 'error' : ''}`}
                    value={form.deadline}
                    onChange={handleChange}
                />
                {errors.deadline && <span className="error-message">{errors.deadline}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="title">
                    Title <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    value={form.title}
                    onChange={handleChange}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="description">
                    Description <span className="required">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    className={`form-input ${errors.description ? 'error' : ''}`}
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                ></textarea>
                {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="type">
                    Type <span className="required">*</span>
                </label>
                <select
                    id="type"
                    name="type"
                    className={`form-input ${errors.type ? 'error' : ''}`}
                    value={form.type}
                    onChange={handleChange}
                >
                    <option value="Habit">Habit</option>
                    <option value="Task">Task</option>
                </select>
                {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="habit-link">Link a Habit</label>
                <select
                    id="habit-link"
                    name="habitLink"
                    className="form-input"
                    value={form.habitLink}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    <option value="meditation">Meditation</option>
                    <option value="exercise">Exercise</option>
                    <option value="reading">Reading</option>
                </select>
            </div>

            <div className="form-group repeat-group">
                <label>Repeat Every</label>
                <div className="repeat-checkboxes">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <label key={day}>
                            <input
                                type="checkbox"
                                name={`repeat-${day.toLowerCase()}`}
                                checked={form.repeat.includes(day.toLowerCase())}
                                onChange={handleChange}
                            />
                            {day}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="until">
                    Until {form.repeat.length > 0 && <span className="required">*</span>}
                </label>
                <input
                    type="date"
                    id="until"
                    name="until"
                    className={`form-input ${errors.until ? 'error' : ''}`}
                    placeholder="dd/mm/yyyy"
                    value={form.until}
                    onChange={handleChange}
                />
                {errors.until && <span className="error-message">{errors.until}</span>}
            </div>

            <button type="submit" className="create-task-btn">
                Create Task
            </button>
        </form>
    );
};

export default CreateTaskForm;