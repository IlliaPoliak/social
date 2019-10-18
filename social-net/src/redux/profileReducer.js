import { getUserProfileDataFromAPI, getUserStatusFromAPI, putUserStatusFromAPI } from '../api/api'

// CONSTANTS

const ADD_POST = 'profileReducer/ADD_POST';
const DELETE_POST = 'profileReducer/DELETE_POST';
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const SET_USER_STATUS = 'profileReducer/SET_USER_STATUS';

// ACTIONS

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })


let initialState = {
    posts: [
        { id: 121212, text: 'post 1', countLikes: 36 },
        { id: 213123, text: 'post 2', countLikes: 4 },
        { id: 432123, text: 'post 3', countLikes: 39 },
        { id: 556322, text: 'post 4', countLikes: 51 }
    ],
    profile: null,
    status: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 566444, text: action.newPostText, countLikes: 0 }],
            }

        case DELETE_POST:
            return {
                ...state,
                posts: [...state.posts].filter((post) => post.id !== action.postId)
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }

        default: return state;
    }
}

// THUNKS

export const getUserProfileData = (userId) => async dispatch => {
    let response = await getUserProfileDataFromAPI(userId)
    dispatch(setUserProfile(response))
}

export const getUserStatus = (userId) => async dispatch => {
    let response = await getUserStatusFromAPI(userId)   
    dispatch(setUserStatus(response))
}

export const updateUserStatus = (status) => async dispatch => {
    let response = await putUserStatusFromAPI(status)
    if (response.resultCode === 0) { dispatch(setUserStatus(status)) }
}