import React from 'react';
import s from './Posts.module.scss'
import Post from './Post';
import AddTextForm from '../AddTextForm/AddTextForm';


const Posts = ({posts, addPost, reset, userPhoto}) => {

    let postsElements = posts.map(({ id, text, countLikes }) => {
        return <Post
            key={id}
            id={id}
            text={text}
            countLikes={countLikes}
            userPhoto={userPhoto}
        />
    })

    const addNewPost = (newPostText) => {
        addPost(newPostText.addInfo)
        reset('addTextForm')
    }

    return (
        <div className={s.posts_panel}>
            <h3 className={s.title}>My posts</h3>
            
            <AddTextForm onSubmit={addNewPost} btnText='Add post'/>
            {postsElements.reverse()}
        </div>
    )
}

export default Posts;