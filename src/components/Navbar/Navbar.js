import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import './Navbar.css';

function NavBar() {
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
				<Toggle
					render={({ on, toggle }) => (
						<div>
							<p onClick={toggle} className='nav-link'>
								Menu
							</p>
							{on && (
								<div className='side-bar-container' onClick={toggle}>
									<div className='side-bar'>
										<Link to='/signup' className='nav-link menu-item'>
											Sign Up
										</Link>
										<Link to='/movies' className='nav-link menu-item'>
											Movies
										</Link>
										<Link to='/reviews' className='nav-link menu-item'>
											Reviews
										</Link>
									</div>
								</div>
							)}
						</div>
					)}
				/>
			</div>
		</nav>
	);
}

export default NavBar;
