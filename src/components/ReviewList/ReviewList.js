import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../../config';

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
		return <div>There was an error retrieving the code</div>;
	}

	return (
		<div>
			{reviews.map((review) => (
				<Link to={`/reviews/${review.id}`} key={review.id}>
					<p>{review.title}</p>
				</Link>
			))}
		</div>
	);
}

export default ReviewList;
