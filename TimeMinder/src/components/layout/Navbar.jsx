import React from 'react';
import '../../css/Navbar.css';
import timeMinderIcon from '../../assets/time-minder.png';
import overviewIcon from '../../assets/overview.png';
import calendarIcon from '../../assets/calendar.png';
import habitsIcon from '../../assets/habits.png';
import listsIcon from '../../assets/lists.png';
import settingsIcon from '../../assets/settings.png';

const Navbar = () => {
	return (
		<nav className="navbar" >
			<div className="navbar-left">
				<img src={timeMinderIcon} alt="TimeMinder Logo" className="navbar-logo" />
				<span className="navbar-title">TimeMinder</span>
			</div>
			<div className="navbar-center">
				<a href="Overview" className="navbar-link navbar-link-active">
                    <img src={overviewIcon} alt="Overview Icon" className="overview-logo" />
                    <span role="img" aria-label="overview"></span> Overview</a>

				<a href="Calendar" className="navbar-link">
                    <img src={calendarIcon} alt="Calendar Icon" className="calendar-logo" />
                    <span role="img" aria-label="calendar"></span> Calendar</a>

				<a href="Habits" className="navbar-link">
                    <img src={habitsIcon} alt="Habits Icon" className='habits-logo' />
                    <span role="img" aria-label="habits"></span> Habits</a>

				<a href="List" className="navbar-link">
                    <img src={listsIcon} alt="List Icon" className="list-logo" />
                    <span role="img" aria-label="list"></span> List</a>
			</div>
			<div className="navbar-right">
                <img src={settingsIcon} alt="Settings Icon" className="settings-logo" />
                <span className="navbar-link" placeholder=""></span>
			</div>
		</nav>
	);
};

export default Navbar;
