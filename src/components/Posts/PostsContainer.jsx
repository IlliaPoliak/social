import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { reset } from 'redux-form'
import { getUserProfileData, getUserStatus } from '../../reducers/profileReducer'
import { addPost } from '../../reducers/profileReducer'
import Posts from './Posts';

class PostsContainer extends Component {

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

    render = () => <Posts {...this.props} />
}

export default compose(
    connect(state => ({ 
        authUserId: state.auth.id,
        posts: state.profilePage.posts,
        userPhoto: state.profilePage.profile ? state.profilePage.profile.photos.large : null, 
    }), { getUserProfileData, getUserStatus, addPost, reset }),
    withRouter,
)(PostsContainer)