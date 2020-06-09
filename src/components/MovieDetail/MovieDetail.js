import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';
import ReactPlayer from 'react-player';

function MovieDetail({ movieId }) {
	const [movie, setMovie] = useState();
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/movies/${movieId}`)
			.then((res) => res.json())
			.then((data) => {
				setMovie(data);
			})
			.catch(() => {
				setError(true);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) {
		return <div>There was an error retrieving the code</div>;
    }

	if (!movie) {
        return <p>Loading ...</p>;
	}

	return (
		<div>
			<h1>
				{movie.title} - ({movie.year_released})
			</h1>
			<button>Edit</button>
			<button>Delete</button>
			<img src={movie.image_url} alt={movie.title} />
			<p>{movie.description}</p>
			<ReactPlayer url={movie.trailer_url} />
			{movie.reviews.map((review) => (
				<Link to={`/reviews/${review.id}`} key={review.id}>
					<p>
						{review.title} - <span>{review.owner}</span>
					</p>
				</Link>
			))}
		</div>
	);
}

export default MovieDetail;
