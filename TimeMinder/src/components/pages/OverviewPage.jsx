import React from 'react';
import '../../css/OverviewPage.css';
import Navbar from '../layout/Navbar';
import CreateTaskForm from '../layout/CreateTaskForm';
import morningIcon from '../../assets/morning.png';

const OverviewPage = () => {
	return (
		<div className="overview-root">
			<Navbar />
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
						<div className="overview-progress-percent">82<span className="overview-progress-percent-sign">%</span></div>
						<div className="overview-progress-bar-container">
							<div className="overview-progress-bar-label">TASK COMPLETED</div>
							<div className="overview-progress-bar-value">8/10</div>
							<div className="overview-progress-bar-bg">
								<div className="overview-progress-bar-fill" style={{width: '82%'}}></div>
							</div>
						</div>
					</div>
                    <div className="overview-stats-boxes">
						<div className="overview-stats-box past-due">PAST DUES<br /><span className="overview-stats-box-value">0</span></div>
						<div className="overview-stats-box today">TODAY<br /><span className="overview-stats-box-value">0</span></div>
						<div className="overview-stats-box incoming">INCOMING<br /><span className="overview-stats-box-value">0</span></div>
						<div className="overview-stats-box empty"></div>
					</div>
				</div>
                <div className="overview-center-panel">
					<h2>Todays Task</h2>
					<ul className="overview-task-list">
						<li><input className="overview-task-checkbox" type="checkbox" /> Start your day with a few minutes of mindfulness or meditation to center yourself</li>
						<li className="overview-task-done"><input className="overview-task-checkbox" type="checkbox" checked readOnly /> <span>Incorporate at least 30 minutes of physical activity into your day, whether it's a workout, walk, or yoga session</span></li>
						<li className="overview-task-done"><input className="overview-task-checkbox" type="checkbox" checked readOnly /> <span>Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels</span></li>
						<li><input className="overview-task-checkbox" type="checkbox" /> Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels</li>
						<li><input className="overview-task-checkbox" type="checkbox" /> Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels</li>
						<li><input className="overview-task-checkbox" type="checkbox" /> Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels</li>
						<li><input className="overview-task-checkbox" type="checkbox" /> Fuel your body with a nutritious breakfast to kickstart your metabolism and energy levels</li>
					</ul>
				</div>
				<div className="overview-right-panel">
					<CreateTaskForm />
				</div>
			</div>
		</div>
	);
};

export default OverviewPage;

