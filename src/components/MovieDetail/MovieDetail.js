import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';

function MovieDetail({ movieId }) {
	const [movie, setMovie] = useState();
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/movies/${movieId}`)
			.then((res) => res.json())
			.then((data) => {
				setMovie(data);
				console.log(data);
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	if (error) {
		return <div>There was an error retrieving the code</div>;
	}

	if (!movie) {
		return <p>Loading ...</p>;
	}

	return (
		<div>
			<h1>{movie.title}</h1>
            <img src={movie.image_url} alt={movie.title} />
			<button>Edit</button>
			<button>Delete</button>
		</div>
	);
}

export default MovieDetail;
