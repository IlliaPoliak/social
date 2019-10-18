import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsContainer from './Posts/PostsContainer';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => (
    <main className={s.content}>
        {
            props.profile === null 
            ? <Preloader />
            : <ProfileInfo {...props} />
        }
        <PostsContainer />
    </main>
)

export default Profile;