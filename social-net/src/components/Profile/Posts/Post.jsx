import React from 'react';
import s from './Posts.module.css'

const Post = ({id, text, countLikes}) => {
    return (
        <div className={s.post_wrapper}>
            <div className={s.post}>
                <div className={s.avatar_wrapper}>
                    <img src="https://media.istockphoto.com/photos/alien-picture-id667378960?k=6&m=667378960&s=612x612&w=0&h=eWZynItyhYK0ovMG858bdRoKWNgDcRWgsOjBhw6FDro=" alt="avatar"/>
                </div>
                <div className={s.post_text}>{text}</div>
            </div>
            <div>{countLikes} likes</div>  
        </div>
    )
}

export default Post;