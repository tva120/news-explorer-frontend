import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
	return <Route>{() => (props.loggedIn ? <Component {...props} /> : <Redirect to="./?need_signup=true" />)}</Route>;
};

export default ProtectedRoute;
