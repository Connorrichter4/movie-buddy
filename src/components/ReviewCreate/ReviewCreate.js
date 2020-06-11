import React, { useState } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import { APIURL } from '../../config';
import {Redirect} from 'react-router-dom'

function ReviewCreate() {
	const initialState = {
		title: '',
		movie: '',
		review_body: '',
	};

	const [review, setReview] = useState(initialState);
	const [validate, setValidate] = useState(false);
	const [success, setSuccess] = useState(false);
	const [newReviewId, setNewReviewId] = useState('');
	// const [errorExists, setErrorExists] = useState(false);

	const validateData = () => {
		for (const value in review) {
			if (review[value].length === 0) {
				setValidate(true);
				return false;
			}
		}
		return true;
	};

	const handleChange = (event) => {
		event.persist();
		setReview({ ...review, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (validateData()) {
			fetch(`${APIURL}/reviews/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					title: review.title,
					review_body: review.review_body,
					movie: parseInt(review.movie),
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setNewReviewId(data.id);
					setSuccess(true);
				})
				.catch(console.error);
		}
	};

	if (success) {
		return <Redirect to={`/reviews/${newReviewId}`} />;
	}

	return (
		<>
			<h1>Create Review</h1>
			<ReviewForm
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				validate={validate}
			/>
		</>
	);
}

export default ReviewCreate;
