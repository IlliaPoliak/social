import React, { Component } from 'react';
import { updateUserAvatar, saveUserProfileData, getUserProfileData, updateUserStatus, getUserStatus } from '../../reducers/profileReducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { connect } from 'react-redux'
import { compose } from 'redux';
import Settings from './Settings';
import Preloader from '../common/Preloader/Preloader';


class SettingsContainer extends Component {
    state = {
        profileData: this.props.profile
    }

    saveProfileData = formData => {
        if (formData && formData !== this.state.profileData) {
            this.props.saveUserProfileData(formData, this.props.authUserId)
        }
    }

    updateStatus = formData => {
        if (formData && formData.status !== this.props.status) {
            this.props.updateUserStatus(formData)
        }
    }

    componentDidMount() { 
        this.props.getUserProfileData(this.props.authUserId)
            .then(()=> this.setState({ profileData: this.props.profile }))
        this.props.getUserStatus(this.props.authUserId)
    }
    
    render() {
        return (
            this.props.profile === null || this.props.status === null
            ? <Preloader />
            : <Settings 
                profile={this.props.profile} 
                status={{status: this.props.status}}
                saveProfileData={this.saveProfileData} 
                updateStatus={this.updateStatus}
                updateUserAvatar={this.props.updateUserAvatar}
            /> 
        )
    }
}

export default compose(
    connect(state => ({ 
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authUserId: state.auth.id,
    }), { getUserProfileData, updateUserAvatar, saveUserProfileData, updateUserStatus, getUserStatus }),
    withAuthRedirect,
)(SettingsContainer)