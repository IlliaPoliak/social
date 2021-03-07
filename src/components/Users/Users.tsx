import React from 'react';
import s from './Users.module.css'
import User from './User'
import Preloader from '../common/Preloader/Preloader';
import { UserType } from '../../types/types';

type PropsType = {
    isFetching: boolean
    users: Array<UserType>
    followingProcess: Array<number>
    followToUser: (userId: number) => void
    unfollowFromUser: (userId: number) => void
}

const Users: React.FC<PropsType> = (props) =>  (
    <div>
        <h3 className={s.users_title}>Users</h3>
        <div className={s.users_wrapper}>
            { props.isFetching 
                ? <Preloader />
                : props.users.map((user) => <User key={user.name + user.id + user.status } user={user} {...props} />)
            }
        </div>
    </div>
)

export default Users;