import { ResultCodes } from './../api/api';
import { PostType, ProfileType, PhotosType } from './../types/types';
import { getUserProfileDataFromAPI, getUserStatusFromAPI, putUserStatusFromAPI, saveUserAvatarAPI, saveUserProfileDataAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { errors, success } from './appReducer'
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './store';

export type ProfileInitialStateType = {
    posts: Array<PostType>,
    profile: {} | ProfileType,
    status: null | string
}

let initialState: ProfileInitialStateType = {
    posts: [
        { id: 121212, text: 'post 1', countLikes: 36 },
        { id: 213123, text: 'post 2', countLikes: 4 },
        { id: 432123, text: 'post 3', countLikes: 39 },
        { id: 556322, text: 'post 4', countLikes: 51 }
    ],
    profile: {},
    status: null
}

export const profileReducer = (state = initialState, action: ActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const postsIds = state.posts.map(({ id }) => id)
            const newId = Math.max(...postsIds) + 1
            return {
                ...state,
                posts: [...state.posts, { id: newId, text: action.newPostText, countLikes: 0 }],
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

        case SET_USER_AVATAR:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }

        default: return state;
    }
}


// CONSTANTS

const ADD_POST = 'profileReducer/ADD_POST';
const DELETE_POST = 'profileReducer/DELETE_POST';
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const SET_USER_STATUS = 'profileReducer/SET_USER_STATUS';
const SET_USER_AVATAR = 'profileReducer/SET_USER_AVATAR';

// ACTIONS 
type ActionsType = AddPostType | DeletePostType | SetUserProfileType | SetUserStatusType | SetUserAvatarType
type AddPostType = { type: typeof ADD_POST, newPostText: string }
type DeletePostType = { type: typeof DELETE_POST, postId: number }
type SetUserProfileType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
type SetUserStatusType = { type: typeof SET_USER_STATUS, status: string }
type SetUserAvatarType = { type: typeof SET_USER_AVATAR, photos: PhotosType }


export const addPost = (newPostText: string): AddPostType => ({ type: ADD_POST, newPostText })
export const deletePost = (postId: number): DeletePostType => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status: string): SetUserStatusType => ({ type: SET_USER_STATUS, status })
export const setUserAvatar = (photos: PhotosType): SetUserAvatarType => ({ type: SET_USER_AVATAR, photos })

// THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfileData = (userId: number): ThunkType => async dispatch => {
    try {
        let response = await getUserProfileDataFromAPI(userId)
        dispatch(setUserProfile(response))
    } catch (e) {
        dispatch(errors(e))
    }
}

export const getUserStatus = (userId: number): ThunkType => async dispatch => {
    try {
        let response = await getUserStatusFromAPI(userId)
        dispatch(setUserStatus(response))
    } catch (e) {
        dispatch(errors(e))
    }
}

export const updateUserStatus = (status: any): ThunkType => async dispatch => {
    try {
        let response = await putUserStatusFromAPI(status)
        if (response.resultCode === ResultCodes.Success) {
            dispatch(setUserStatus(status.status))
            dispatch(success())
        }
        // else { dispatch(stopSubmit('status', { _error: response.messages || 'Some error' })) }
    } catch (e) {
        dispatch(errors(e))
    }
}

export const updateUserAvatar = (photo: string): ThunkType => async dispatch => {
    try {
        let response = await saveUserAvatarAPI(photo)
        if (response.resultCode === ResultCodes.Success) {
            dispatch(setUserAvatar(response.data.photos))
            dispatch(success())
        }
    } catch (e) {
        dispatch(errors(e))
    }
}

export const saveUserProfileData = (profile: ProfileType, userId: number): ThunkType => async dispatch => {
    try {
        let response = await saveUserProfileDataAPI(profile)
        if (response.resultCode === ResultCodes.Success) {
            dispatch(getUserProfileData(userId))
            dispatch(success())
        } else {
            // dispatch(stopSubmit('edit-profile', { _error: response.messages || 'Some error' }))
            //dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': response.messages[0]}}))
            // return Promise.reject(response.data.message[0])
        }
    } catch (e) {
        dispatch(errors(e))
    }
}