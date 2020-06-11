import React, {useState} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import ReviewList from './components/ReviewList/ReviewList';
import ReviewDetail from './components/ReviewDetail/ReviewDetail';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import ReviewCreate from './components/ReviewCreate/ReviewCreate';
import ReviewEdit from './components/ReviewEdit/ReviewEdit'
import './App.css';

function App() {

	// const [logged_In, setLoggedIn] = useState(localStorage.getItem('token') ? true: false)
	// const [username, setUsername] = useState('')

	let history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		// setUsername('');
		history.push('/login')
	}

	return (
		<div className='main'>
			<Route
				path='*'
				render={() => {
					return <NavBar handleLogout={handleLogout} />;
				}}
			/>
			<Switch>
				<Route path='/' exact component={Home} />
				{/* Review Paths */}
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
					path='/create/review'
					render={() => {
						return <ReviewCreate />;
					}}
				/>
				<Route
					exact
					path='/reviews/edit/:id'
					render={(routerProps) => {
						return <ReviewEdit reviewId={routerProps.match.params.id} />;
					}}
				/>
				{/* Movie Paths */}
				<Route path='/movies' exact component={MovieList} />
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
						return <SignUp />;
					}}
				/>
				<Route
					exact
					path='/login'
					render={() => {
						return <Login />;
					}}
				/>
			</Switch>
		</div>
	);
}

export default App;
