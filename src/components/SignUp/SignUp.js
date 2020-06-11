import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../../config';
import './SignUp.css';

function SignUp() {
	const initialState = {
		email: '',
		username: '',
		password: '',
	};

	const [signUp, setSignUp] = useState(initialState);
	const [success, setSuccess] = useState(false);

	const handleChange = (event) => {
		event.persist();
		setSignUp({ ...signUp, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`${APIURL}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(signUp),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				console.log('logging in');
				fetch(`${APIURL}/api/token/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username: signUp.username,
						password: signUp.password,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						console.log('logged in');
					})
					.catch(console.error);
			})
			.catch(console.error);

		return <Redirect to='/' />;
	};

	if (success) {
		return <Redirect to='/' />;
	}

	return (
		<div className='signup-container'>
			<form className='signup-form' onSubmit={handleSubmit}>
				<h1>Sign Up</h1>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					name='email'
					placeholder='Email'
					onChange={handleChange}
				/>
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
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default SignUp;
