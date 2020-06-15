import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { APIURL } from '../../config';

import './Home.css';

function Home() {
	const [reviews, setReviews] = useState([]);
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/reviews/`)
			.then((res) => res.json())
			.then((data) => {
				data.sort((a, b) => (a.updated_at - b.updated_at ? 1 : -1));
				setReviews(data.slice(0, 3));
				console.log(data);
			})
			.catch(() => {
				setError(true);
			});

		fetch(`${APIURL}/movies/`)
			.then((res) => res.json())
			.then((data) => {
				data.sort((a, b) => (a.created - b.created ? 1 : -1));
				setMovies(data.slice(0,4));
				console.log(data.slice(0,4));
			})
			.catch(() => {
				setError(true);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) {
		return (
			<div className='error-retrieve'>
				There was an error retrieving the info
			</div>
		);
	}

	if (!reviews || !movies) {
		return <p>Loading ...</p>;
	}
	return (
		<div>
			<div className='home-image'>
				<div className='main-text'>
					<span>Post Reviews</span>
					<span>Share Movies</span>
				</div>
			</div>
			<div className='home-details'>
				<h2>Recently Added Movies: </h2>
				<div className='recently-added'>
					{movies.map((movie) => (
						<Link
							to={`/movies/${movie.id}`}
							key={movie.id}
							className='movie-link'>
							<img
								className='recently-added-image'
								src={movie.image_url}
								alt={movie.title}
							/>
						</Link>
					))}
					<Link to='/movies' className='see-more-link'>
						<p className='see-more-movies'>See More ...</p>
					</Link>
				</div>
				<h2>Reviews: </h2>
				<div className='review-container'>
					{reviews.map((review) => (
						<Link
							to={`/reviews/${review.id}`}
							key={review.id}
							className='review'>
							<h2 className='review-title'>{review.title}</h2>
							<p className='review-owner'>
								{review.owner} - {review.created.substr(5, 5)}
							</p>
							<p className='review-body'>
								{review.review_body.substr(0, 250)}...
							</p>
						</Link>
					))}
					<Link to='/reviews' className='review'>
						<p className='see-more-reviews'>See More ...</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
