import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';
import { PlusCircle } from 'react-bootstrap-icons'
import './MovieList.css'

function MovieList() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/movies/`)
			.then((res) => res.json())
			.then((data) => {
                setMovies(data);
                console.log(data)
			})
			.catch(() => {
				setError(true);
			});
	},[]);

	if (error) {
		return <div>There was an error retrieving the code</div>;
	}

	return (
		<div>
			<h1>
				Movies
				{localStorage.getItem('token') && (
					<Link to='/create/movie' className='create-movie'>
						<PlusCircle color='#30323d' size='24px' />
					</Link>
				)}
			</h1>
			{movies.map((movie) => (
				<Link to={`/movies/${movie.id}`} key={movie.id} className='movie-link'>
					<img className='movie-image' src={movie.image_url} alt={movie.title} />
				</Link>
			))}
		</div>
	);
}

export default MovieList;
