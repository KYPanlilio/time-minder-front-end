import React, { useState, useEffect } from 'react';
import '../../../css/TaskModal.css';

const EditableField = ({ fieldName, value, type = 'text', isEditing, handleChange, editedTask, onClick }) => {
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
                    <option value="">Select a habit</option>
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

    return (
        <p 
            className="task-field-value task-field-clickable"
            onClick={onClick}
        >
            {value}
        </p>
    );
};

const TaskModal = ({ task, taskIndex, onClose, onSave, onDelete }) => {
    const [editedTask, setEditedTask] = useState(task);
    const [editingField, setEditingField] = useState(null);

    // Sync editedTask when task prop changes
    useEffect(() => {
        setEditedTask(task);
    }, [task]);

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

    return (
        <div className="task-modal-overlay" onClick={onClose}>
            <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="task-modal-header">
                    <h2>Task Details</h2>
                    <button className="task-modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="task-modal-body">
                    {/* Title Field */}
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Title</span>
                        </div>
                        <EditableField
                            fieldName="title"
                            value={editedTask.title || 'Not set'}
                            isEditing={editingField === 'title'}
                            editedTask={editedTask}
                            handleChange={handleChange}
                            onClick={() => setEditingField(editingField === 'title' ? null : 'title')}
                        />
                    </div>

                    {/* Description Field */}
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Description</span>
                        </div>
                        <EditableField
                            fieldName="description"
                            value={editedTask.description || 'Not set'}
                            type="textarea"
                            isEditing={editingField === 'description'}
                            editedTask={editedTask}
                            handleChange={handleChange}
                            onClick={() => setEditingField(editingField === 'description' ? null : 'description')}
                        />
                    </div>

                    {/* Type Field */}
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Type</span>
                        </div>
                        <EditableField
                            fieldName="type"
                            value={editedTask.type || 'Not set'}
                            type="type-select"
                            isEditing={editingField === 'type'}
                            editedTask={editedTask}
                            handleChange={handleChange}
                            onClick={() => setEditingField(editingField === 'type' ? null : 'type')}
                        />
                    </div>

                    {/* Deadline Field */}
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Deadline</span>
                        </div>
                        <EditableField
                            fieldName="deadline"
                            value={formatDatetime(editedTask.deadline)}
                            type="datetime-local"
                            isEditing={editingField === 'deadline'}
                            editedTask={editedTask}
                            handleChange={handleChange}
                            onClick={() => setEditingField(editingField === 'deadline' ? null : 'deadline')}
                        />
                    </div>

                    {/* Linked Habit Field */}
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Linked Habit</span>
                        </div>
                        <EditableField
                            fieldName="habitLink"
                            value={getHabitLabel(editedTask.habitLink)}
                            type="select"
                            isEditing={editingField === 'habitLink'}
                            editedTask={editedTask}
                            handleChange={handleChange}
                            onClick={() => setEditingField(editingField === 'habitLink' ? null : 'habitLink')}
                        />
                    </div>

                    {/* Repeat Every Field */}
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Repeat Every</span>
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
                            <p 
                                className="task-field-value task-field-clickable"
                                onClick={() => setEditingField(editingField === 'repeat' ? null : 'repeat')}
                            >
                                {getRepeatDays(editedTask.repeat)}
                            </p>
                        )}
                    </div>

                    {/* Repeat Until Field */}
                    <div className="task-field-group">
                        <div className="task-field-header">
                            <span className="task-field-label">Repeat Until</span>
                        </div>
                        <EditableField
                            fieldName="until"
                            value={formatDate(editedTask.until)}
                            type="date"
                            isEditing={editingField === 'until'}
                            editedTask={editedTask}
                            handleChange={handleChange}
                            onClick={() => setEditingField(editingField === 'until' ? null : 'until')}
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