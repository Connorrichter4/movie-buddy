import React, { useState } from 'react';
import MovieForm from '../MovieForm/MovieForm';
import { APIURL } from '../../config';
import { Redirect } from 'react-router-dom';

function MovieCreate() {
	const initialState = {
		title: '',
		description: '',
		image_url: '',
		trailer_url: '',
		year_released: '',
	};

	const [movie, setMovie] = useState(initialState);
	const [validate, setValidate] = useState(false);
    const [success, setSuccess] = useState(false);
    const [newMovieId, setNewMovieId] = useState('');

	const validateData = () => {
		for (const value in movie) {
			if (movie[value].length === 0) {
				setValidate(true);
				return false;
			}
		}
		return true;
	};

	const handleChange = (event) => {
		event.persist();
		setMovie({ ...movie, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (validateData()) {
			fetch(`${APIURL}/movies/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(movie),
			})
				.then((response) => {
					console.log(response.ok);
					if (response.ok) {
						return response.json();
					} else {
						setValidate(true);
					}
				})
				.then((data) => {
					console.log(data);
					setNewMovieId(data.id);
					setSuccess(true);
				})
				.catch(() => {
					setValidate(true);
				});
		}
	};

	if (success) {
		return <Redirect to={`/movies/${newMovieId}`} />;
	}

	return (
		<>
			<h1>Add Movie</h1>
			<MovieForm
				handleChange={handleChange}
				movie={movie}
                validate={validate}
                handleSubmit={handleSubmit}
			/>
		</>
	);
}

export default MovieCreate;
