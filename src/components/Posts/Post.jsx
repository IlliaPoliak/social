import React from 'react';
import s from './Posts.module.scss'
import UserAvatar from '../UserAvatar/UserAvatar';

const Post = ({text, countLikes, userPhoto}) => {
    return (
        <div className={s.post_wrapper}>
            <div className={s.post}>
                <div className={s.avatar_wrapper}>
                    <UserAvatar photos={userPhoto} />
                </div>
                 
                <div className={s.post_text}>{text}</div>
                {/* <div>{countLikes} likes</div>  */}
            </div>
            
        </div>
    )
}

export default Post;