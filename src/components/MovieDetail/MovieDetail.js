import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';
import ReactPlayer from 'react-player';
import './MovieDetail.css';

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
			<h1 className='movie-header'>
				{movie.title} - ({movie.year_released})
			</h1>
			<div className='movie-container'>
				<img src={movie.image_url} alt={movie.title} />
				<p className='description'>{movie.description}</p>
			</div>
			<div className='divider'>
				<div></div>
				<span>Trailer</span>
				<div></div>
			</div>
			<ReactPlayer url={movie.trailer_url} className='trailer' />
			<div className='divider'>
				<div></div>
				<span>Reviews</span>
				<div></div>
			</div>
			<div className='review-container'>
				{movie.reviews.map((review) => (
					<Link to={`/reviews/${review.id}`} key={review.id} className='review'>
						<h2 className='review-title'>{review.title}</h2>
						<p className='review-owner'>
							{review.owner} - {review.created.substr(5, 5)}
						</p>
						<p className='review-body'>
							{review.review_body.substr(0, 100)}...
						</p>
					</Link>
				))}
			</div>
			{movie.reviews.length === 0 && <div>There are no reviews yet!</div>}
		</div>
	);
}

export default MovieDetail;
