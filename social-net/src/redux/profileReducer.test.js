
import { addPost, deletePost } from './profileReducer'
import { profileReducer } from './profileReducer'

let state = {
    posts: [
        { id: 121212, text: 'post 1', countLikes: 36 },
        { id: 213123, text: 'post 2', countLikes: 4 },
        { id: 432123, text: 'post 3', countLikes: 39 },
        { id: 556322, text: 'post 4', countLikes: 51 }
    ]
}

it('posts length should be incremented', () => {
    let action = addPost('new post')
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
});
  
it('message of new post should be correct', () => {
    let action = addPost('new post')
    let newState = profileReducer(state, action)

    expect(newState.posts[4].text).toBe('new post')
});

it('posts length should be decremented if id is correst', () => {
    let action = deletePost(121212)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
});