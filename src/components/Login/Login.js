import React, { useState } from 'react';
import { APIURL } from '../../config';
import '../SignUp/SignUp.css';
import { Redirect } from 'react-router-dom';

function Login() {
	const initialState = {
		username: '',
		password: '',
	};

	const [logIn, setLogIn] = useState(initialState);
	const [success, setSuccess] = useState(false);
	const [errorExists, setErrorExists] = useState(false);

	const handleChange = (event) => {
		event.persist();
		setLogIn({ ...logIn, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`${APIURL}/api/token/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(logIn),
		})
			.then((response) => {
				console.log(response.ok);
				if (response.ok) {
					return response.json();
				} else {
					setErrorExists(true);
				}
			})
			.then((data) => {
				console.log(data)
				if (data !== undefined) {
					localStorage.setItem('token', data.access);
					localStorage.setItem('username', logIn.username);
					setSuccess(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (success) {
		return <Redirect to='/' />;
	}

	return (
		<div className='signup-container'>
			<form className='signup-form' onSubmit={handleSubmit}>
				<h1>Login</h1>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					name='username'
					placeholder='Username'
					onChange={handleChange}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					placeholder='Password'
					onChange={handleChange}
				/>
				{errorExists && (
					<p className='error-message'>
						That username and password combination does not exist. Please try
						again or sign up.
					</p>
				)}
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default Login;
