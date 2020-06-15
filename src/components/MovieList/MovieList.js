import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';
import { PlusCircle } from 'react-bootstrap-icons';
import './MovieList.css';

function MovieList() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/movies/`)
			.then((res) => res.json())
			.then((data) => {
				data.sort((a, b) => (a.title > b.title ? 1 : -1));
				setMovies(data);
				console.log(data);
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	if (error) {
		return (
			<div className='error-retrieve'>
				There was an error retrieving the movies
			</div>
		);
	}

	return (
		<div className='movie-list-container'>
			<h1>
				Movies
				{localStorage.getItem('token') && (
					<Link to='/create/movie' className='create-movie'>
						<PlusCircle color='#30323d' size='24px' />
					</Link>
				)}
			</h1>
			<div className='movie-grid'>
				{movies.map((movie) => (
					<Link
						to={`/movies/${movie.id}`}
						key={movie.id}
						className='movie-link'>
						<img
							className='movie-list-image'
							src={movie.image_url}
							alt={movie.title}
						/>
					</Link>
				))}
			</div>
		</div>
	);
}

export default MovieList;
