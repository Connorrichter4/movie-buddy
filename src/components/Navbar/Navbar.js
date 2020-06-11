import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import { GridFill, PeopleFill } from 'react-bootstrap-icons'
import './Navbar.css';

function NavBar(props) {
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
				{localStorage.getItem('token') && (
					<p className='nav-link'>{localStorage.getItem('username')}</p>
				)}
				<Toggle
					render={({ on, toggle }) => (
						<div>
							<p onClick={toggle} className='nav-link'>
								<GridFill />
							</p>
							{on && (
								<div className='side-bar-container' onClick={toggle}>
									<div className='side-bar'>
										{!localStorage.getItem('token') && (
											<>
												<Link to='/signup' className='nav-link menu-item'>
													Sign Up
												</Link>
												<Link to='/login' className='nav-link menu-item'>
													<PeopleFill />
													Login
												</Link>
											</>
										)}
										{localStorage.getItem('token') && (
											<>
												<div
													to='/logout'
													className='nav-link menu-item'
													onClick={props.handleLogout}>
													Log Out
												</div>
												<Link to='/create/movie' className='nav-link menu-item'>
													Create Movie
												</Link>
												<Link
													to='/create/review'
													className='nav-link menu-item'>
													Create Review
												</Link>
											</>
										)}
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
