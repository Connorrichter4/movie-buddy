import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';
import { PlusCircle } from 'react-bootstrap-icons';
import './ReviewList.css'

function ReviewList() {
	const [reviews, setReviews] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/reviews/`)
			.then((res) => res.json())
			.then((data) => {
				data.sort((a,b) => (a.created - b.created ? 1 : -1));
				setReviews(data);
				console.log(data);
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	if (error) {
		return <div className='error-retrieve'>There was an error retrieving the reviews</div>;
	}

	return (
		<div>
			<h1 className='review-header'>
				Reviews
				{localStorage.getItem('token') && (
					<Link to='/create/review' className='create-review'>
						<PlusCircle color='#30323d' size='24px' />
					</Link>
				)}
			</h1>
			<div className='review-container'>
				{reviews.map((review) => (
					<Link to={`/reviews/${review.id}`} key={review.id} className='review'>
							<h2 className='review-title'>
								{review.title}
							</h2>
							<p className='review-owner'>
								{review.owner} - {review.created.substr(5,5)}
							</p>
							<p className='review-body'>
								{review.review_body.substr(0,250)}...
							</p>
					</Link>
				))}
			</div>
			{reviews.length===0 && <div>There are no reviews yet!</div>}
		</div>
	);
}

export default ReviewList;
