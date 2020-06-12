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
			<h1>
				Reviews
				{localStorage.getItem('token') && (
					<Link to='/create/review' className='create-review'>
						<PlusCircle color='#30323d' size='24px' />
					</Link>
				)}
			</h1>
			{reviews.map((review) => (
				<Link to={`/reviews/${review.id}`} key={review.id}>
					<p>
						{review.title} - <span>{review.owner}</span>
					</p>
				</Link>
			))}
			{reviews.length===0 && <div>There are no reviews yet!</div>}
		</div>
	);
}

export default ReviewList;
