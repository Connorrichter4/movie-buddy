import React, { useState, useEffect } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import { APIURL } from '../../config';
import { Redirect } from 'react-router-dom';

function ReviewEdit(props) {
	const initialState = {
		title: '',
		movie: '',
		review_body: '',
	};

	const [review, setReview] = useState(initialState);
	const [validate, setValidate] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/reviews/${props.reviewId}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setReview(data);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			fetch(`${APIURL}/reviews/${review.id}`, {
				method: 'PUT',
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
					setSuccess(true);
				})
				.catch(console.error);
		}
	};

	if (success) {
		return <Redirect to={`/reviews/${review.id}`} />;
	}

	return (
		<>
			<h1>Edit Review</h1>
			<ReviewForm
				review={review}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				validate={validate}
			/>
		</>
	);
}

export default ReviewEdit;
