import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
	return (
		<nav>
			<Link to='/' className='app-name nav-link'>
				MovieBuddy
			</Link>
			<div className='right-side-nav'>
				<Link to='/movies' className='nav-link'>
					Movies
				</Link>
				<Link to='/reviews' className='nav-link'>
					Reviews
				</Link>
				<button className='nav-link'>Menu</button>
			</div>
		</nav>
	);
}

export default Navbar;
