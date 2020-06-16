import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { APIURL } from '../../config';
import ReactPlayer from 'react-player';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import './MovieDetail.css';

function MovieDetail({ movieId }) {
	const [movie, setMovie] = useState();
	const [error, setError] = useState(false);
	const [deleted, setDeleted] = useState(false);

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

	const deleteMovie = () => {
		fetch(`${APIURL}/movies/${movieId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}).then(() => {
			setDeleted(true);
		});
	};

	if (deleted) {
		return <Redirect to='/movies' />;
	}

	if (error) {
		return <div>There was an error retrieving the code</div>;
	}

	if (!movie) {
		return <p className='movie-loading'>Loading ...</p>;
	}

	return (
		<div>
			<Link to='/movies' className='movie-back'>
				<ArrowLeftCircle size='20px' />
				<p className='movie-back-text'>Back to movies</p>
			</Link>
			<div className='movie-header'>
				<h1 >
					{movie.title} - ({movie.year_released})
				</h1>
				<div className='buttons'>
					<Link to={`/movies/edit/${movie.id}`} className='edit-buttons'>Edit</Link>
					<button onClick={deleteMovie} className='delete-buttons'>Delete</button>
				</div>
			</div>
			<div className='movie-container'>
				<img
					src={movie.image_url}
					alt={movie.title}
					className='movie-detail-image'
				/>
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
			{movie.reviews.length === 0 && (
				<div className='movie-reviews'>There are no reviews yet!</div>
			)}
		</div>
	);
}

export default MovieDetail;
