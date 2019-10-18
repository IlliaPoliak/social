import React from 'react';
import s from './Users.module.css'
import noImage from '../../img/user.png'
import { NavLink } from 'react-router-dom'

const User = props => {
    let { user, followingProcess, followToUser, unfollowFromUser } = props;
    let { id, photos, followed, name, status } = user;

    return (
        <div className={s.user}>
            <div className={s.avatar_wrapper}>
                <NavLink to={`profile/${id}`}>
                    <img className={s.avatar} src={photos.small || noImage} alt={name} />
                </NavLink>
            </div>
            <div className={s.info_wrapper}>
                <div className={s.user_name}>{name}</div>
                <div>id: {id}</div>
                <div>status: {String(status)}</div>
                <div>followed: {String(followed)}</div>
            </div>
            <div className={s.btn_wrapper}>
                { followed 
                    ? <button 
                        disabled={followingProcess.some( id => id === user.id)} 
                        onClick={() => { 
                            unfollowFromUser(id) 
                        }} >Unfollow</button>
                    : <button 
                        disabled={followingProcess.some( id => id === user.id)} 
                        onClick={() => { 
                            followToUser(id) 
                        }} >Follow</button>
                }
            </div>
        </div>
    )
}

export default User;