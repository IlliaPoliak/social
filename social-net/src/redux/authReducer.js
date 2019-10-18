import { getAuthUserDataFromAPI, loginAPI, logoutAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { getUserStatus } from './profileReducer'

// CONSTANTS

const SET_USER_DATA = 'authReducer/SET_USER_DATA';

// ACTIONS

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
})

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default: return state;
    }
}

// THUNKS

export const getAuthUserData = () => async dispatch => {
    let response = await getAuthUserDataFromAPI()
       
    if (response.resultCode === 0) {
        let { id, login, email } = response.data
        dispatch(setAuthUserData(id, email, login, true))
        dispatch(getUserStatus(id))
    }
}

export const login = (email, password, rememberMe) => async dispatch => {
    let response = await loginAPI(email, password, rememberMe)
    
    if (response.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let errMessage = response.messages.length > 0 ? response.messages : 'Some error'
        dispatch(stopSubmit('login', {_error: errMessage}))
    }
}

export const logout = () => async dispatch => {
    let response = await logoutAPI()
    
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}