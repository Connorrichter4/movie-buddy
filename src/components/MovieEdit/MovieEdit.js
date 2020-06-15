import React, { useState, useEffect } from 'react';
import MovieForm from '../MovieForm/MovieForm';
import { APIURL } from '../../config';
import { Redirect } from 'react-router-dom';

function MovieEdit(props) {
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

	useEffect(() => {
		fetch(`${APIURL}/movies/${props.movieId}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setMovie(data);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const validateData = () => {
		if (movie.title === '') {
			setValidate(true);
			return false;
		} else if (movie.description === '') {
			setValidate(true);
			return false;
		} else if (movie.image_url === '') {
			setValidate(true);
			return false;
		} else if (movie.trailer_url === '') {
			setValidate(true);
			return false;
		} else if (movie.year === '') {
			setValidate(true);
			return false;
		} else {
			return true;
		}
	};

	const handleChange = (event) => {
		event.persist();
		setMovie({ ...movie, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (validateData()) {
			fetch(`${APIURL}/movies/${movie.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					title: movie.title,
					description: movie.description,
					image_url: movie.image_url,
					trailer_url: movie.trailer_url,
					year_released: movie.year_released,
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
		return <Redirect to={`/movies/${movie.id}`} />;
	}

	return (
		<>
			<h1>Edit Movie</h1>
			<MovieForm
				handleChange={handleChange}
				movie={movie}
				validate={validate}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}

export default MovieEdit;
