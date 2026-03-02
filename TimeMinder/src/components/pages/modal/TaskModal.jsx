import React, { useState } from 'react';
import '../../../css/TaskModal.css';

const TaskModal = ({ task, taskIndex, onClose, onSave, onDelete }) => {
    const [editedTask, setEditedTask] = useState(task);
    const [editingField, setEditingField] = useState(null);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name.startsWith('repeat-')) {
            setEditedTask(t => ({
                ...t,
                repeat: checked
                    ? [...(t.repeat || []), name.replace('repeat-', '')]
                    : (t.repeat || []).filter(day => day !== name.replace('repeat-', '')),
            }));
        } else {
            setEditedTask(t => ({ ...t, [name]: value }));
        }
    };

    const handleSave = () => {
        onSave(taskIndex, editedTask);
        onClose();
    };

    const handleDelete = () => {
        onDelete(taskIndex);
        onClose();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Not set';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatDatetime = (datetimeStr) => {
        if (!datetimeStr) return 'Not set';
        const date = new Date(datetimeStr);
        return date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getHabitLabel = (habitLink) => {
        if (!habitLink) return 'None';
        const habits = {
            'meditation': 'Meditation',
            'exercise': 'Exercise',
            'reading': 'Reading'
        };
        return habits[habitLink] || habitLink;
    };

    const getRepeatDays = (repeatArray) => {
        if (!repeatArray || repeatArray.length === 0) return 'No repeat';
        const dayLabels = {
            'sun': 'SUN',
            'mon': 'MON',
            'tue': 'TUE',
            'wed': 'WED',
            'thu': 'THU',
            'fri': 'FRI',
            'sat': 'SAT'
        };
        return repeatArray.map(day => dayLabels[day] || day.toUpperCase()).join(', ');
    };

    const EditableField = ({ fieldName, label, value, type = 'text', isEditing }) => {
        if (isEditing) {
            if (type === 'textarea') {
                return (
                    <textarea
                        name={fieldName}
                        className="task-inline-edit-textarea"
                        value={editedTask[fieldName]}
                        onChange={handleChange}
                        rows={3}
                    />
                );
            } else if (type === 'select') {
                return (
                    <select
                        name={fieldName}
                        className="task-inline-edit-input"
                        value={editedTask[fieldName]}
                        onChange={handleChange}
                    >
                        <option value="">Select a habit...</option>
                        <option value="meditation">Meditation</option>
                        <option value="exercise">Exercise</option>
                        <option value="reading">Reading</option>
                    </select>
                );
            } else if (type === 'type-select') {
                return (
                    <select
                        name={fieldName}
                        className="task-inline-edit-input"
                        value={editedTask[fieldName]}
                        onChange={handleChange}
                    >
                        <option value="Habit">Habit</option>
                        <option value="Task">Task</option>
                    </select>
                );
            } else {
                return (
                    <input
                        type={type}
                        name={fieldName}
                        className="task-inline-edit-input"
                        value={editedTask[fieldName]}
                        onChange={handleChange}
                    />
                );
            }
        }

        return <p className="task-field-value">{value}</p>;
    };

    return (
        <div className="task-modal-overlay" onClick={onClose}>
            <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="task-modal-header">
                    <h2>Task Details</h2>
                    <button className="task-modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="task-modal-body">
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Title</span>
                            <button
                                className="task-edit-btn"
                                onClick={() => setEditingField(editingField === 'title' ? null : 'title')}
                                title="Edit title"
                            >
                                ✏️
                            </button>
                        </div>
                        <EditableField
                            fieldName="title"
                            label="Title"
                            value={editedTask.title || 'Not set'}
                            isEditing={editingField === 'title'}
                        />
                    </div>

                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Description</span>
                            <button
                                className="task-edit-btn"
                                onClick={() => setEditingField(editingField === 'description' ? null : 'description')}
                                title="Edit description"
                            >
                                ✏️
                            </button>
                        </div>
                        <EditableField
                            fieldName="description"
                            label="Description"
                            value={editedTask.description || 'Not set'}
                            type="textarea"
                            isEditing={editingField === 'description'}
                        />
                    </div>

                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Type</span>
                            <button
                                className="task-edit-btn"
                                onClick={() => setEditingField(editingField === 'type' ? null : 'type')}
                                title="Edit type"
                            >
                                ✏️
                            </button>
                        </div>
                        <EditableField
                            fieldName="type"
                            label="Type"
                            value={editedTask.type || 'Not set'}
                            type="type-select"
                            isEditing={editingField === 'type'}
                        />
                    </div>

                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Deadline</span>
                            <button
                                className="task-edit-btn"
                                onClick={() => setEditingField(editingField === 'deadline' ? null : 'deadline')}
                                title="Edit deadline"
                            >
                                ✏️
                            </button>
                        </div>
                        <EditableField
                            fieldName="deadline"
                            label="Deadline"
                            value={formatDatetime(editedTask.deadline)}
                            type="datetime-local"
                            isEditing={editingField === 'deadline'}
                        />
                    </div>

                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Linked Habit</span>
                            <button
                                className="task-edit-btn"
                                onClick={() => setEditingField(editingField === 'habitLink' ? null : 'habitLink')}
                                title="Edit habit link"
                            >
                                ✏️
                            </button>
                        </div>
                        <EditableField
                            fieldName="habitLink"
                            label="Linked Habit"
                            value={getHabitLabel(editedTask.habitLink)}
                            type="select"
                            isEditing={editingField === 'habitLink'}
                        />
                    </div>

                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Repeat Every</span>
                            <button
                                className="task-edit-btn"
                                onClick={() => setEditingField(editingField === 'repeat' ? null : 'repeat')}
                                title="Edit repeat days"
                            >
                                ✏️
                            </button>
                        </div>
                        {editingField === 'repeat' ? (
                            <div className="task-repeat-checkboxes">
                                {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(day => (
                                    <label key={day} className="task-repeat-checkbox-label">
                                        <input
                                            type="checkbox"
                                            name={`repeat-${day.toLowerCase()}`}
                                            checked={(editedTask.repeat || []).includes(day.toLowerCase())}
                                            onChange={handleChange}
                                        />
                                        <span>{day}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className="task-field-value">{getRepeatDays(editedTask.repeat)}</p>
                        )}
                    </div>

                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Repeat Until</span>
                            <button
                                className="task-edit-btn"
                                onClick={() => setEditingField(editingField === 'until' ? null : 'until')}
                                title="Edit repeat until date"
                            >
                                ✏️
                            </button>
                        </div>
                        <EditableField
                            fieldName="until"
                            label="Repeat Until"
                            value={formatDate(editedTask.until)}
                            type="date"
                            isEditing={editingField === 'until'}
                        />
                    </div>
                </div>

                <div className="task-modal-footer">
                    <button className="task-modal-btn task-modal-btn-delete" onClick={handleDelete}>
                        Delete
                    </button>
                    <div className="task-modal-btn-group">
                        <button className="task-modal-btn task-modal-btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="task-modal-btn task-modal-btn-save" onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;