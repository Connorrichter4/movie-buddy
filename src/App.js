import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import ReviewList from './components/ReviewList/ReviewList';
import ReviewDetail from './components/ReviewDetail/ReviewDetail';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import './App.css';

function App() {

	const [logged_In, setLoggedIn] = useState(localStorage.getItem('token') ? true: false)


	return (
		<div className='main'>
			<Route path='*' component={NavBar} />
			<Switch>
				<Route path='/' exact component={Home} />
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
				<Route
					exact
					path='/signup'
					render={() => {
						return <SignUp setLoggedIn={setLoggedIn} />;
					}}
				/>
			</Switch>
		</div>
	);
}

export default App;
