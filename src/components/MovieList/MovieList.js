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
			{movies.map((movie) => (
				<div key={movie._id}>
					<img src={movie.image_url} alt={movie.title} />
				</div>
			))}
		</div>
	);
}

export default MovieList;
