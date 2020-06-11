import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';

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
				{localStorage.getItem('token') && <Link to='/'>(+)</Link>}
			</h1>
			{movies.map((movie) => (
				<Link to={`/movies/${movie.id}`} key={movie.id}>
					<img src={movie.image_url} alt={movie.title} />
				</Link>
			))}
		</div>
	);
}

export default MovieList;
