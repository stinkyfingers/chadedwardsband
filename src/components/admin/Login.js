import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';
import { AdminContext } from '../../Context';
import { authorizedUserEmails, clientId } from '../../Config';
import { googleUser } from '../../Api';

const scopes = [
	'https://www.googleapis.com/auth/photoslibrary',
];

const checkUser = (user) => {
	return (authorizedUserEmails.includes(user.email));
};

const Login = ({ setAdmin, setErr }) => {
	const login = useGoogleLogin({
		scope: 'https://www.googleapis.com/auth/photoslibrary',
		onSuccess: (res) => {
			const hasAccess = hasGrantedAllScopesGoogle(res, scopes[0]);
			if (!hasAccess) {
				setErr('user is not authorized');
				return;
			}

			// authorize
			googleUser(res.access_token).then((user) => {
				if (checkUser(user)) {
					localStorage.setItem('ce_admin', JSON.stringify(res));
					setAdmin(res);
				} else {
					setErr('unauthorized user');
				}
			});
		}
	});
	return (
		<button onClick={login}>Login</button>
	)
};

const Logout = ({ setAdmin }) => {
	const logout = () => {
		setAdmin(null);
		localStorage.removeItem('ce_admin');
	}
	return (
		<button onClick={logout}>Logout</button>
	);
};

const AdminLogin = () => {
	const [admin, setAdmin] = React.useContext(AdminContext);
	const [err, setErr] = React.useState();
	return (
		<div>
			{ err && <div className='error'>{err}</div> }
			<div className='GoogleLogin'>
				<GoogleOAuthProvider clientId={clientId}>
					{ admin ? <Logout setAdmin={setAdmin} /> : <Login setAdmin={setAdmin} setErr={setErr} /> }
				</GoogleOAuthProvider>
			</div>
		</div>
	);
};

export default AdminLogin;
