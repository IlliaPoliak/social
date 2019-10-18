import { getAuthUserData } from '../redux/authReducer'

// CONSTANTS

const INITIAL_SUCCESS = 'appReducer/INITIAL_SUCCESS';

// ACTIONS

export const initialSuccess = () => ({ type: INITIAL_SUCCESS })

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIAL_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default: return state;
    }
}

// THUNKS

export const initializeApp = () => dispatch => {

    Promise.all([
        dispatch(getAuthUserData()),
    ]).then(() => dispatch(initialSuccess()))
}
