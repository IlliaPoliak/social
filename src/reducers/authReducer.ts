import { ResultCodes } from './../api/api';
import { getAuthUserDataFromAPI, loginAPI, logoutAPI, getCaptchaAPI } from '../api/api'
import { stopSubmit, reset, FormAction } from 'redux-form'
import { getUserStatus } from './profileReducer'
import { errors } from './appReducer'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './store'

export type AuthInitialStateType = {
    id: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean,
    captchaUrl: null | string
}

let initialState: AuthInitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state = initialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }

        default: return state;
    }
}


// CONSTANTS

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const SET_CAPTCHA_URL = 'authReducer/SET_CAPTCHA_URL';

// ACTIONS
type ActionsType = SetAuthUserDataType | SetCaptchaUrlType | FormAction
type SetAuthUserDataPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType
}
type SetCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL,
    payload: { captchaUrl: string }
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
})
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlType => ({ type: SET_CAPTCHA_URL, payload: { captchaUrl } })

// THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = (): ThunkType => async dispatch => {
    try {
        let response = await getAuthUserDataFromAPI()
        if (response.resultCode === ResultCodes.Success) {
            let { id, login, email } = response.data
            dispatch(setAuthUserData(id, email, login, true))
            dispatch(getUserStatus(id))
        }
    } catch (e) {
        dispatch(errors(e))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async dispatch => {
    try {
        let response = await loginAPI(email, password, rememberMe, captcha)
        if (response.resultCode === ResultCodes.Success) {
            dispatch(getAuthUserData())
        } else {
            if (response.resultCode === ResultCodes.CaptchaIsRequired) {
                dispatch(getCaptcha())
            }
            dispatch(reset('login'))
            dispatch(stopSubmit('login', { _error: response.messages || 'Some error' }))
        }
    } catch (e) {
        dispatch(errors(e))
    }
}

export const logout = (): ThunkType => async dispatch => {
    try {
        let response = await logoutAPI()
        if (response.resultCode === ResultCodes.Success) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    } catch (e) {
        dispatch(errors(e))
    }
}

export const getCaptcha = (): ThunkType => async dispatch => {
    try {
        let response = await getCaptchaAPI()
        if (response) { dispatch(setCaptchaUrl(response.url)) }
    } catch (e) {
        dispatch(errors(e))
    }
}