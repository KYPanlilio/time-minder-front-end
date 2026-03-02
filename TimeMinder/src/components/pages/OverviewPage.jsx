import React, { useState } from 'react';
import '../../css/OverviewPage.css';
import CreateTaskForm from '../layout/CreateTaskForm';
import morningIcon from '../../assets/morning.png';
import timeMinderIcon from '../../assets/time-minder.png';
import overviewIcon from '../../assets/overview.png';
import calendarIcon from '../../assets/calendar.png';
import habitsIcon from '../../assets/habits.png';
import listsIcon from '../../assets/lists.png';
import settingsIcon from '../../assets/settings.png';

const initialTasks = [
	{ text: 'Start your day with a few minutes of mindfulness or meditation to center yourself', done: false },
	{ text: 'Incorporate at least 30 minutes of physical activity into your day, whether it\'s a workout, walk, or yoga session', done: true },
	{ text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: true },
	{ text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false },
	{ text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false },
	{ text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false },
	{ text: 'Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels', done: false },
];


const OverviewPage = () => {
	const [tasks, setTasks] = useState(initialTasks);

	const completedCount = tasks.filter(t => t.done).length;
	const percent = Math.round((completedCount / tasks.length) * 100);

	const stats = {
		pastDue: tasks.filter(t => !t.done).length,
		today: completedCount,
		incoming: tasks.length,
	};

	const addTask = (task) => {
		setTasks(prev => [...prev, { text: task.title, done: false }]);
	};

	const toggleTask = idx => {
		setTasks(prev => prev.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
	};

	return (
		<div className="overview-root">
			<nav className="navbar">
				<div className="navbar-left">
					<img src={timeMinderIcon} alt="TimeMinder Logo" className="navbar-logo" />
					<span className="navbar-title">TimeMinder</span>
				</div>
				<div className="navbar-center">
					<a href="Overview" className="navbar-link navbar-link-active">
						<img src={overviewIcon} alt="Overview Icon" className="overview-logo" />
						<span role="img" aria-label="overview"></span> Overview
					</a>
					<a href="Calendar" className="navbar-link">
						<img src={calendarIcon} alt="Calendar Icon" className="calendar-logo" />
						<span role="img" aria-label="calendar"></span> Calendar
					</a>
					<a href="Habits" className="navbar-link">
						<img src={habitsIcon} alt="Habits Icon" className='habits-logo' />
						<span role="img" aria-label="habits"></span> Habits
					</a>
					<a href="List" className="navbar-link">
						<img src={listsIcon} alt="List Icon" className="list-logo" />
						<span role="img" aria-label="list"></span> List
					</a>
				</div>
				<div className="navbar-right">
					<img src={settingsIcon} alt="Settings Icon" className="settings-logo" />
					<span className="navbar-link" placeholder=""></span>
				</div>
			</nav>
			<div className="overview-content">
				<div className="overview-left-panel">
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
					<h2>Todays Task</h2>
					<ul className="overview-task-list">
						{tasks.map((task, idx) => (
							<li key={idx} className={task.done ? 'overview-task-done' : ''}>
								<input
									className="overview-task-checkbox"
									type="checkbox"
									checked={task.done}
									onChange={() => toggleTask(idx)}
								/>
								<span>{task.text}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="overview-right-panel">
					<CreateTaskForm addTask={addTask} />
				</div>
			</div>
		</div>
	);
};

export default OverviewPage;

