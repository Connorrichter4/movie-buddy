import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
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
				{/* <Toggle
					render={({on, toggle}) => (
						<div>
							{on && <h1>Show</h1>}
							<button onClick={toggle} className='nav-link'>
								Menu
							</button>
						</div>
					)}
				/> */}
			</div>
		</nav>
	);
}

export default Navbar;
