import { getAuthUserData } from './authReducer'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './store'

export type AppInitialStateType = {
    initialized: boolean,
    errors: null | string,
    success: null | string
}

let initialState: AppInitialStateType = {
    initialized: false,
    errors: null,
    success: null
}

export const appReducer = (state = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case INITIAL_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }

        default: return state;
    }
}

// THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initializeApp = (): ThunkType => async dispatch => {
    try {
        await dispatch(getAuthUserData())
        dispatch(initialSuccess())
    } catch (e) {
        dispatch(errors(e))
    }
}

export const errors = (errors: string): ThunkType => async dispatch => {
    dispatch(setErrors(errors))
    setTimeout(() => {
        dispatch(setErrors(null))
    }, 3000);
}

export const success = (): ThunkType => async dispatch => {
    dispatch(setSuccess('Operation Successful'))
    setTimeout(() => {
        dispatch(setSuccess(null))
    }, 3000);
}

// CONSTANTS

const INITIAL_SUCCESS = 'appReducer/INITIAL_SUCCESS';
const SET_ERRORS = 'appReducer/SET_ERRORS';
const SET_SUCCESS = 'appReducer/SET_SUCCESS';

// ACTIONS
type ActionsType = InitialSuccessType | SetErrorsType | SetSuccessType

type InitialSuccessType = { type: typeof INITIAL_SUCCESS }
type SetErrorsType = { type: typeof SET_ERRORS, payload: string | null }
type SetSuccessType = { type: typeof SET_SUCCESS, payload: string | null }

export const initialSuccess = (): InitialSuccessType => ({ type: INITIAL_SUCCESS })
export const setErrors = (errors: string | null): SetErrorsType => ({ type: SET_ERRORS, payload: errors })
export const setSuccess = (success: string | null): SetSuccessType => ({ type: SET_SUCCESS, payload: success })