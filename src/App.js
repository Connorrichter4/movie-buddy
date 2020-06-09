import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import ReviewList from './components/ReviewList/ReviewList';
import ReviewDetail from './components/ReviewDetail/ReviewDetail';
import './App.css';

function App() {
	return (
		<div className='main'>
			<Route path='*' component={Navbar} />
			<Switch>
				<Route path='/movies' exact component={MovieList} />
				<Route path='/reviews' exact component={ReviewList} />
				<Route
					exact
					path='/reviews/:id'
					render={(routerProps) => {
						return <ReviewDetail reviewId={routerProps.match.params.id} />;
					}}
				/>
				<Route
					exact
					path='/movies/:id'
					render={(routerProps) => {
						return <MovieDetail movieId={routerProps.match.params.id} />;
					}}
				/>
			</Switch>
		</div>
	);
}

export default App;
