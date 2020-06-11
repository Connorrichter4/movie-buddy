import React from 'react';
import './MovieForm.css';

function MovieForm(props) {

	return (
		<form className='movie-form' onSubmit={props.handleSubmit}>
			<label htmlFor='title'>Title:</label>
			<input
				type='text'
				placeholder='Add movie title'
				name='title'
				onChange={props.handleChange}
				className='input-area'
				value={props.movie.title}
			/>
			<label htmlFor='description'>Description:</label>
			<textarea
				rows='8'
				placeholder='Add description here'
				name='description'
				onChange={props.handleChange}
				className='input-area'
				value={props.movie.description}
			/>
			<label htmlFor='image_url'>Image URL:</label>
			<input
				type='text'
				placeholder='Add movie image URL'
				name='image_url'
				onChange={props.handleChange}
				className='input-area'
				value={props.movie.image_url}
			/>
			<label htmlFor='trailer_url'>Trailer URL:</label>
			<input
				type='text'
				placeholder='Add movie trailer URL'
				name='trailer_url'
				onChange={props.handleChange}
				className='input-area'
				value={props.movie.trailer_url}
			/>
			<label htmlFor='year_released'>Year released:</label>
			<input
				type='text'
				placeholder='Add release year'
				name='year_released'
				onChange={props.handleChange}
				className='input-area'
				value={props.movie.year_released}
			/>
			{props.validate && (
				<p className='review-error'>All fields are required</p>
			)}
			<button type='submit' className='submit-button'>
				Submit
			</button>
		</form>
	);
}

export default MovieForm;
