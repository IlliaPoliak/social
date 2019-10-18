import React, { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getUserProfileData, getUserStatus, updateUserStatus } from '../../redux/profileReducer'
import { compose } from 'redux';


class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId){
            userId = this.props.authUserId
            if (!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileData(userId)
        this.props.getUserStatus(userId)
    }

    updateStatus = (status) => {
        this.props.updateUserStatus(status)
    }

    render = () => <Profile {...this.props} updateStatus={this.updateStatus} />
}

export default compose(
    connect(state => ({ 
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }), { getUserProfileData, getUserStatus, updateUserStatus }),
    withRouter,
)(ProfileContainer)