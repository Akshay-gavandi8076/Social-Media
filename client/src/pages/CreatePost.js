import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

function CreatePost() {
	let history = useHistory();

	const initialValues = {
		title: '',
		postText: '',
		username: ''
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('You must enter a Title'),
		postText: Yup.string().required('You must enter something to post'),
		username: Yup.string().min(3).required('You must enter a Username')
	});

	const onSubmit = data => {
		axios.post('http://localhost:3001/posts', data).then(response => {
			history.push('/');
		});
	};

	return (
		<div className='createPostPage'>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className='formContainer'>
					<label>Title:</label>
					<ErrorMessage name='title' component='span' />
					<Field
						// autoComplete='off'
						id='inputCreatePost'
						name='title'
						placeholder='Enter Title Here...'
					/>

					<label>Post:</label>
					<ErrorMessage name='postText' component='span' />
					<Field
						// autoComplete='off'
						id='inputCreatePost'
						name='postText'
						placeholder='Enter Post Content Here...'
					/>

					<label>Username:</label>
					<ErrorMessage name='username' component='span' />
					<Field
						// autoComplete='off'
						id='inputCreatePost'
						name='username'
						placeholder='Enter Username Here...'
					/>
					<button type='submit'>Create Post</button>
				</Form>
			</Formik>
		</div>
	);
}

export default CreatePost;
