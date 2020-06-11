import React, { useEffect, useState } from 'react';
import './ReviewForm.css';
import {APIURL} from '../../config';

function ReviewForm(props) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(`${APIURL}/movies/`)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data);
			})
			.catch(console.error);
	}, []);

	return (
		<form className='review-form' onSubmit={props.handleSubmit}>
			<label htmlFor='title'>Title:</label>
			<input
				type='text'
				placeholder='Add review title'
				name='title'
				onChange={props.handleChange}
				className='input-area'
				value={props.review.title}
			/>
			<label htmlFor='body'>Body:</label>
			<textarea
				rows='12'
				placeholder='Add review here'
				name='review_body'
				onChange={props.handleChange}
				className='input-area'
				value={props.review.review_body}
			/>
			<label htmlFor='movie'>Movie:</label>
			<select name='movie' className='input-area' onChange={props.handleChange} value={props.review.movie}>
				<option defaultValue='' value=''>Select a movie</option>
				{movies.map((movie) => (
					<option key={movie.id} value={movie.id}>
						{movie.title}
					</option>
				))}
			</select>
			{props.validate && (
				<p className='review-error'>
					All fields are required
				</p>
			)}
			<button type='submit' className='submit-button'>
				Submit
			</button>
		</form>
	);
}

export default ReviewForm;
