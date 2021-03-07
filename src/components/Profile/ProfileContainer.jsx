import React, { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getUserProfileData, getUserStatus } from '../../reducers/profileReducer'
import { compose } from 'redux';


class ProfileContainer extends Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId
        if (!userId){
            userId = this.props.authUserId
            if (!userId){
                return this.props.history.push('/login')
            }
        }
        this.props.getUserProfileData(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() { this.refreshProfile() }

    componentDidUpdate(prevProps){
        if (this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile()
        }
    }

    render = () => this.props.profile ? <Profile {...this.props}/> : ''
}

export default compose(
    connect(state => ({ 
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.id,
    }), { getUserProfileData, getUserStatus }),
    withRouter,
)(ProfileContainer)