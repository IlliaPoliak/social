import React from 'react';
import s from './Posts.module.css'
import Post from './Post';
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../../validators/validator';
import {Textarea} from '../../common/FormsControls/FormsControls';

const maxLength30 = maxLengthCreator(30)

const AddPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.post_text_wrapper}>
                <Field 
                    component={Textarea}
                    name='addPostField'
                    placeholder="Write a new post"
                    validate={[required, maxLength30]}
                />
            </div>
            <div className={s.post_btn_wrapper}>
                <button className={s.post_btn}>Add post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm({ form: 'addPost' })(AddPostForm)

const Posts = props => {
    
        let postsElements = props.posts.map(({ id, text, countLikes }) => <Post key={id} id={id} text={text} countLikes={countLikes} />)
    
        const addNewPost = (newPostText) => {
            props.addPost(newPostText.addPostField)
        }
    
        return (
            <div className={s.posts_panel}>
                <h3 className={s.title}>My posts</h3>
                <AddPostReduxForm onSubmit={addNewPost} />
    
                {postsElements.reverse()}
            </div>
        )
    
}

export default Posts;