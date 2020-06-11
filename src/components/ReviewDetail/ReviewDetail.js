import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';
import { Redirect, Link } from 'react-router-dom';

function ReviewDetail({ reviewId }) {
	const [review, setReview] = useState();
	const [error, setError] = useState(false);
	const [deleted, setDeleted] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/reviews/${reviewId}`)
			.then((res) => res.json())
			.then((data) => {
				setReview(data);
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

	const deleteReview = (event) => {
		event.preventDefault();
		fetch(`${APIURL}/reviews/${reviewId}`, {
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
		return <Redirect to='/reviews' />;
	}

	if (!review) {
		return <p>Loading ...</p>;
	}

	return (
		<div>
			<h1>{review.title}</h1>
			<p>Written by: {review.owner}</p>
			<p>{review.review_body}</p>
			{review.owner === localStorage.getItem('username') && (
				<div>
					<Link to={`/reviews/edit/${reviewId}`}>Edit</Link>
					<button onClick={deleteReview}>Delete</button>
				</div>
			)}
		</div>
	);
}

export default ReviewDetail;
