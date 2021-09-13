import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	useHistory
} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from './helper/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [authState, setAuthState] = useState({
		username: '',
		id: 0,
		status: false
	});

	let history = useHistory();

	useEffect(() => {
		axios
			.get('http://localhost:3001/auth/authver', {
				headers: {
					accessToken: localStorage.getItem('accessToken')
				}
			})
			.then(response => {
				if (response.data.error) {
					setAuthState({ ...authState, status: false });
				} else {
					setAuthState({
						username: response.data.username,
						id: response.data.id,
						status: true
					});
				}
			});
		setAuthState(true);
		// eslint-disable-next-line
	}, []);

	const logout = () => {
		localStorage.removeItem('accessToken');
		setAuthState({ username: '', id: 0, status: false });
	};

	return (
		<div className='App'>
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<Router>
					<div className='navbar'>
						<Link to='/' className='AppName'>
							Social Media
						</Link>
						{!authState.status ? (
							<>
								<Link to='/login'> Login</Link>
								<Link to='/registration'> Registration</Link>
							</>
						) : (
							<>
								<Link to='/'> Home Page</Link>
								<Link to='/createpost'> Create A Post</Link>
								<div className='loggedInContainer'>
									<label>{authState.username}</label>
									<button onClick={logout}>
										{authState.status ? (
											<>
												<ExitToAppIcon />
												<span>Logout</span>
											</>
										) : (
											''
										)}
									</button>
								</div>
							</>
						)}
					</div>
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/createpost' exact component={CreatePost} />
						<Route path='/post/:id' exact component={Post} />
						<Route path='/registration' exact component={Registration} />
						<Route path='/login' exact component={Login} />
						<Route path='/profile/:id' exact component={Profile} />
						<Route path='/changepassword' exact component={ChangePassword} />
						<Route path='*' exact component={PageNotFound} />
					</Switch>
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
