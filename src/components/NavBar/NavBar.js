import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import { List, PeopleFill } from 'react-bootstrap-icons';
import './Navbar.css';

function NavBar(props) {
	return (
		<nav>
			<Link to='/' className='app-name nav-link'>
				MovieBuddy
			</Link>
			<div className='right-side-nav'>
				<Toggle
					render={({ on, toggle }) => (
						<div>
							<p onClick={toggle} className='nav-link'>
								<List size='26px' />
							</p>
							{on && (
								<div className='side-bar-container' onClick={toggle}>
									<div className='side-bar'>
										<Link to='/' className='nav-link menu-item'>
											Home
										</Link>
										<Link to='/movies' className='nav-link menu-item'>
											Movies
										</Link>
										<Link to='/reviews' className='nav-link menu-item'>
											Reviews
										</Link>
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
												<Link to='/create/movie' className='nav-link menu-item'>
													Add A Movie
												</Link>
												<Link
													to='/create/review'
													className='nav-link menu-item'>
													Create A Review
												</Link>
												<Link
													to='/logout'
													className='nav-link menu-item'
													onClick={props.handleLogout}>
													Log Out
												</Link>
											</>
										)}
									</div>
								</div>
							)}
						</div>
					)}
				/>
				{localStorage.getItem('token') && (
					<p className='nav-link'>{localStorage.getItem('username')}</p>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
