import React, { useEffect, useState } from 'react';
import './ReviewForm.css';
import {APIURL} from '../../config';

function ReviewForm() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(`${APIURL}/movies/`)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data);
				console.log(data);
			})
			.catch(console.error);
	}, []);

	return (
		<form className='review-form'>
			<label htmlFor='title'>Title:</label>
			<input
				type='text'
				placeholder='Add review title'
				required
				name='title'
				className='input-area'
			/>
			<label htmlFor='body'>Body:</label>
			<textarea
				rows='12'
				placeholder='Add review here'
				required
				name='body'
				className='input-area'
			/>
			<label htmlFor='body'>Movie:</label>
			<select required name='movie' className='input-area' placeholder='Select a Movie'>
				{movies.map((movie) => (
					<option key={movie.id} value={movie.id}>
						{movie.title}
					</option>
				))}
			</select>
		</form>
	);
}

export default ReviewForm;
