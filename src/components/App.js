import React, { Component } from 'react';
import { Route, withRouter, HashRouter, Switch, Redirect } from 'react-router-dom';
import { withSuspense } from './hoc/withSuspense';

import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { initializeApp } from '../reducers/appReducer';
import store from '../reducers/store';

import './App.scss';
import Preloader from './common/Preloader/Preloader';
import HeaderContainer from './Header/HeaderContainer';
import Footer from './Footer/Footer';
import ProfileSideBar from './ProfileSideBar/ProfileSideBar';
import PostsContainer from './Posts/PostsContainer';

const Login = React.lazy(() => import('./Login/Login'));
const SettingsContainer = React.lazy(() => import('./Settings/SettingsContainer'));
const UsersContainer = React.lazy(() => import('./Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const Error404 = React.lazy(() => import('./Errors/404/Error404'));

class App extends Component {

	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		if (!this.props.initialized) { return <Preloader /> }

		return (
			<div className="app-wrapper">
				<HeaderContainer />
				<ProfileSideBar />
				<div className='app-wrapper-content'>
					<Switch>
						<Redirect exact from="/" to="/profile" />
						<Route path='/login' render={() => withSuspense(Login)} />
						<Route path='/profile/:userId?' render={() => withSuspense(PostsContainer)} />
						<Route path='/dialogs' render={() => withSuspense(DialogsContainer)} />
						<Route path='/users' render={() => withSuspense(UsersContainer)} />
						<Route path='/settings' render={() => withSuspense(SettingsContainer)} />
						<Route path='*' render={() => withSuspense(Error404)} />
					</Switch>
				</div>
				<Footer />
			</div>
		)
	}
}

const AppContainer = compose(
	connect(state => ({
		initialized: state.app.initialized,
	}), { initializeApp }),
	withRouter)(App)

const AppWithStore = () => {
	return (
		<HashRouter basename={process.env.PUBLIC_URL}>
			<Provider store={store} >
				<AppContainer />
			</Provider>
		</HashRouter>
	)
}

export default AppWithStore