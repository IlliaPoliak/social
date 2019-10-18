import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './components/hoc/withSuspense';

const Login = React.lazy(() => import('./components/Login/Login'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends Component {

  componentDidMount() { this.props.initializeApp() }

  render() {

    if (!this.props.initialized) { return <Preloader/> }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/login' render={() => withSuspense(Login) } />
          <Route path='/profile/:userId?' render={() => withSuspense(ProfileContainer) } />
          <Route path='/dialogs' render={() => withSuspense(DialogsContainer) } />
          <Route path='/users' render={() => withSuspense(UsersContainer) } />
        </div>
        <Footer />
      </div>
    )
  }
}

export default compose(
  connect(state => ({ initialized: state.app.initialized }), { initializeApp }),
  withRouter)(App)