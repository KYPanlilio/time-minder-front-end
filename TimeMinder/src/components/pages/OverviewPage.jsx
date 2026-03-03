import React, { useState, useEffect } from 'react';
import '../../css/OverviewPage.css';
import CreateTaskForm from '../layout/CreateTaskForm';
import TaskModal from './modal/TaskModal';
import morningIcon from '../../assets/morning.png';
import timeMinderIcon from '../../assets/time-minder.png';
import overviewIcon from '../../assets/overview.png';
import calendarIcon from '../../assets/calendar.png';
import habitsIcon from '../../assets/habits.png';
import listsIcon from '../../assets/lists.png';
import settingsIcon from '../../assets/settings.png';

const initialTasks = [
    { text: 'Start your day with a few minutes of mindfulness or meditation to center yourself', done: false, title: 'Morning Mindfulness', description: 'Start your day with a few minutes of mindfulness or meditation to center yourself', type: 'Habit', deadline: '', habitLink: '', repeat: [], until: '' },
    { text: 'Incorporate at least 30 minutes of physical activity into your day, whether it\'s a workout, walk, or yoga session', done: false, title: 'Physical Activity', description: 'Incorporate at least 30 minutes of physical activity into your day, whether it\'s a workout, walk, or yoga session', type: 'Habit', deadline: '', habitLink: 'exercise', repeat: ['mon', 'wed', 'fri'], until: '' },
    { text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false, title: 'Nutritious Breakfast', description: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', type: 'Task', deadline: '', habitLink: '', repeat: [], until: '' },
    { text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false, title: 'Nutritious Breakfast 2', description: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', type: 'Task', deadline: '', habitLink: '', repeat: [], until: '' },
    { text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false, title: 'Nutritious Breakfast 3', description: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', type: 'Task', deadline: '', habitLink: '', repeat: [], until: '' },
    { text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false, title: 'Nutritious Breakfast 4', description: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', type: 'Task', deadline: '', habitLink: '', repeat: [], until: '' },
    { text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false, title: 'Nutritious Breakfast 5', description: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', type: 'Task', deadline: '', habitLink: '', repeat: [], until: '' },
];

const OverviewPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 8;

    useEffect(() => {
        const savedTasks = localStorage.getItem('timeminderTasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                console.error('Error loading tasks:', error);
                setTasks(initialTasks);
            }
        } else {
            setTasks(initialTasks);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mobileMenuOpen && !e.target.closest('.navbar') && !e.target.closest('.navbar-mobile-menu')) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('timeminderTasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const completedCount = tasks.filter(t => t.done).length;
    const percent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

    const stats = {
        pastDue: tasks.filter(t => !t.done).length,
        today: completedCount,
        incoming: tasks.length,
    };

    const addTask = (taskData) => {
        const newTask = {
            title: taskData.title,
            description: taskData.description,
            type: taskData.type,
            deadline: taskData.deadline,
            habitLink: taskData.habitLink,
            repeat: taskData.repeat || [],
            until: taskData.until,
            text: taskData.title,
            done: false,
        };
        setTasks(prev => [...prev, newTask]);
    };

    const toggleTask = idx => {
        setTasks(prev => prev.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
    };

    const openTaskModal = (idx) => {
        setSelectedTaskIndex(idx);
    };

    const closeTaskModal = () => {
        setSelectedTaskIndex(null);
    };

    const saveTask = (idx, newTask) => {
    setTasks(prev => prev.map((t, i) => i === idx ? { ...newTask, text: newTask.title } : t));
    };

    const deleteTask = (idx) => {
        setTasks(prev => prev.filter((_, i) => i !== idx));
    };

    const tabs = [
        { label: 'All',    count: tasks.length },
        { label: 'Today',  count: tasks.filter(t => !t.done).length },
        { label: 'Tasks',  count: tasks.filter(t => t.type === 'Task').length },
        { label: 'Habits', count: tasks.filter(t => t.type === 'Habit').length },
        { label: 'Done',   count: tasks.filter(t => t.done).length },
    ];

    const filteredTasks = tasks
        .map((t, idx) => ({ ...t, originalIdx: idx }))
        .filter(t => {
            if (activeTab === 'All')    return true;
            if (activeTab === 'Today')  return !t.done;
            if (activeTab === 'Tasks')  return t.type === 'Task';
            if (activeTab === 'Habits') return t.type === 'Habit';
            if (activeTab === 'Done')   return t.done;
            return true;
        });

    const navLinks = [
        { href: 'Overview', label: 'Overview', icon: overviewIcon, alt: 'Overview Icon', className: 'overview-logo', active: true },
        { href: 'Calendar', label: 'Calendar', icon: calendarIcon, alt: 'Calendar Icon', className: 'calendar-logo' },
        { href: 'Habits', label: 'Habits', icon: habitsIcon, alt: 'Habits Icon', className: 'habits-logo' },
        { href: 'List', label: 'List', icon: listsIcon, alt: 'List Icon', className: 'list-logo' },
    ];

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    const currentTasks = filteredTasks.slice(startIndex, endIndex);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

        useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    return (
        <div className="overview-root">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={timeMinderIcon} alt="TimeMinder Logo" className="navbar-logo" />
                    <span className="navbar-title">TimeMinder</span>
                </div>

                <div className="navbar-center">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`navbar-link${link.active ? ' navbar-link-active' : ''}`}
                        >
                            <img src={link.icon} alt={link.alt} className={link.className} />
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="navbar-right">
                    <img src={settingsIcon} alt="Settings Icon" className="settings-logo" />
                    <button
                        className="navbar-hamburger"
                        onClick={() => setMobileMenuOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
            <div className="overview-content">
                <div className="overview-left-panel">
                    <div className="overview-bg" />
                    <div className="overview-greeting">
                        <img src={morningIcon} alt="Morning Icon" className="morning-logo" />
                        <div className="overview-greeting-text">
                            <span role="img" aria-label="weather"></span>
                            <span>Good morning, Alvin! Rise and shine, ready to tackle the day ahead with enthusiasm and positivity?</span>
                        </div>
                    </div>
                    <div className="overview-progress">
                        <div className="overview-progress-percent">{percent}<span className="overview-progress-percent-sign">%</span></div>
                        <div className="overview-progress-bar-container">
                            <div className="overview-progress-bar-label">TASK COMPLETED</div>
                            <div className="overview-progress-bar-value">{completedCount}/{tasks.length}</div>
                            <div className="overview-progress-bar-bg">
                                <div className="overview-progress-bar-fill" style={{width: `${percent}%`}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="overview-stats-boxes">
                        <div className="overview-stats-box past-due">PAST DUES<br /><span className="overview-stats-box-value">{stats.pastDue}</span></div>
                        <div className="overview-stats-box today">TODAY<br /><span className="overview-stats-box-value">{stats.today}</span></div>
                        <div className="overview-stats-box incoming">INCOMING<br /><span className="overview-stats-box-value">{stats.incoming}</span></div>
                        <div className="overview-stats-box empty"></div>
                    </div>
                </div>
                <div className="overview-center-panel">
                <h2>Today's Tasks</h2>

                <div className="task-tab-bar">
                    {tabs.map(tab => (
                        <button
                            key={tab.label}
                            className={`task-tab${activeTab === tab.label ? ' task-tab-active' : ''}`}
                            onClick={() => setActiveTab(tab.label)}
                        >
                            {tab.label}
                            <span className="task-tab-count">{tab.count}</span>
                        </button>
                    ))}
                </div>

                <ul className="overview-task-list">
                    {currentTasks.length === 0 ? (
                        <li className="overview-task-empty">
                            No tasks in this category yet.
                        </li>
                    ) : (
                        currentTasks.map(task => (
                            <li
                                key={task.originalIdx}
                                className={task.done ? 'overview-task-done' : ''}
                                onClick={() => openTaskModal(task.originalIdx)}
                            >
                                <input
                                    className="overview-task-checkbox"
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => toggleTask(task.originalIdx)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <span>{task.text}</span>
                            </li>
                        ))
                    )}
                </ul>

                {totalPages > 1 && (
                    <div className="pagination-controls">
                        <button 
                            className="pagination-btn pagination-btn-prev" 
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        > &lt; </button>
                        
                        <span className="pagination-info">
                            Page {currentPage} of {totalPages}
                        </span>
                        
                        <button 
                            className="pagination-btn pagination-btn-next" 
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                        > &gt; </button>
                    </div>
                )}
            </div>
                <div className="overview-right-panel">
                    <CreateTaskForm addTask={addTask} />
                </div>
            </div>

            {selectedTaskIndex !== null && (
                <TaskModal
                    task={tasks[selectedTaskIndex]}
                    taskIndex={selectedTaskIndex}
                    onClose={closeTaskModal}
                    onSave={saveTask}
                    onDelete={deleteTask}
                />
            )}
        </div>
    );
};

export default OverviewPage;