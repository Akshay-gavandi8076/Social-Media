import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
// import { AuthContext } from '../helper/AuthContext';

const CustomToolTip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11
	}
}))(Tooltip);

function Home() {
	const [listOfPosts, setListOfPosts] = useState([]);
	const [likedPosts, setLikedPosts] = useState([]);
	// const { authState } = useContext(AuthContext);

	let history = useHistory();

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			history.push('/login');
		} else {
			axios
				.get('http://localhost:3001/posts', {
					headers: { accessToken: localStorage.getItem('accessToken') }
				})
				.then(response => {
					setListOfPosts(response.data.listOfPosts);
					setLikedPosts(
						response.data.likedPosts.map(like => {
							return like.PostId;
						})
					);
				});
		}
		// eslint-disable-next-line
	}, []);

	const likeAPost = postId => {
		axios
			.post(
				'http://localhost:3001/likes',
				{ PostId: postId },
				{ headers: { accessToken: localStorage.getItem('accessToken') } }
			)
			.then(response => {
				setListOfPosts(
					listOfPosts.map(post => {
						if (post.id === postId) {
							if (response.data.liked) {
								return { ...post, Likes: [...post.Likes, 0] };
							} else {
								const likesArray = post.Likes;
								likesArray.pop();
								return { ...post, Likes: likesArray };
							}
						} else {
							return post;
						}
					})
				);

				if (likedPosts.includes(postId)) {
					setLikedPosts(
						likedPosts.filter(id => {
							return id !== postId;
						})
					);
				} else {
					setLikedPosts([...likedPosts, postId]);
				}
			});
	};

	return (
		<div>
			{listOfPosts.map((value, key) => {
				return (
					<div key={key} className='post'>
						<div className='title'> {value.title} </div>
						<div
							className='body'
							onClick={() => {
								history.push(`/post/${value.id}`);
							}}
						>
							{value.postText}
						</div>
						<div className='footer'>
							<div className='username'>
								<Link to={`/profile/${value.UserId}`}>{value.username}</Link>
							</div>
							<div className='buttons'>
								<CustomToolTip
									title={likedPosts.includes(value.id) ? 'Unlike' : 'Like'}
								>
									<ThumbUpAltIcon
										onClick={() => {
											likeAPost(value.id);
										}}
										className={
											likedPosts.includes(value.id) ? 'unlikeBttn' : 'likeBttn'
										}
									/>
								</CustomToolTip>

								<label> {value.Likes.length}</label>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
