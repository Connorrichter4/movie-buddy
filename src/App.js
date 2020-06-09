import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import ReviewList from './components/ReviewList/ReviewList';
import './App.css';

function App() {
	return (
		<div className='main'>
			<Route path='*' component={Navbar} />
			<Switch>
				<Route path='/movies' exact component={MovieList} />
				<Route path='/reviews' exact component={ReviewList} />
			</Switch>
		</div>
	);
}

export default App;
