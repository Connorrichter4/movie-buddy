import React, { useState, useEffect } from 'react';
import { APIURL } from '../../config';

function ReviewDetail({ reviewId }) {
	const [review, setReview] = useState();
	const [error, setError] = useState(false);

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
    
    if(!review){
        return <p>Loading ...</p>
    }

	return (
		<div>
			<h1>{review.title}</h1>
            <p>Written by: {review.owner}</p>
            <p>{review.review_body}</p>
            <button>Edit</button>
            <button>Delete</button>
		</div>
	);
}

export default ReviewDetail;
