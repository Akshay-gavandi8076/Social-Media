import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helper/AuthContext';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { setAuthState } = useContext(AuthContext);

	let history = useHistory();

	const login = () => {
		const data = { username: username, password: password };
		axios.post('http://localhost:3001/auth/login', data).then(response => {
			if (response.data.error) {
				alert(response.data.error);
			} else {
				localStorage.setItem('accessToken', response.data.token);
				setAuthState({
					username: response.data.username,
					id: response.data.id,
					status: true
				});
				history.push('/');
			}
		});
	};
	return (
		<div className='loginContainer'>
			<label>Username:</label>
			<input
				type='text'
				onChange={event => {
					setUsername(event.target.value);
				}}
				placeholder='Enter Your Username...'
			/>
			<label>Password:</label>
			<input
				type='password'
				onChange={event => {
					setPassword(event.target.value);
				}}
				placeholder='Enter Your Password...'
			/>

			<button onClick={login}>Login</button>
		</div>
	);
}

export default Login;