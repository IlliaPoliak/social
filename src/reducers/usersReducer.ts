import { UserType } from './../types/types';
import { getUsersFromAPI, followToUserAPI, unfollowFromUserAPI } from '../api/api'
import { errors, success } from './appReducer'
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './store';

type UsersInitialStateType = {
    users: [] | Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingProcess: [] | Array<number> // array of ids
}

let initialState: UsersInitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProcess: []
}

export const usersReducer = (state = initialState, action: ActionsType): UsersInitialStateType => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: [...state.users].map((user) => {
                    if (user.id === action.userId) {
                        user.followed = true
                    }
                    return user;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: [...state.users].map((user) => {
                    if (user.id === action.userId) {
                        user.followed = false
                    }
                    return user;
                })
            }

        case TOGGLE_FOLLOWING_PROCESS:
            return {
                ...state,
                followingProcess: action.bool
                    ? [...state.followingProcess, action.id]
                    : state.followingProcess.filter(id => id !== action.id)
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber,
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount,
            }

        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.bool,
            }

        default: return state;
    }
}

// CONSTANTS

const FOLLOW = 'usersReducer/FOLLOW';
const UNFOLLOW = 'usersReducer/UNFOLLOW';
const SET_USERS = 'usersReducer/SET_USERS';
const SET_CURRENT_PAGE = 'usersReducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'usersReducer/TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_PROCESS = 'usersReducer/TOGGLE_FOLLOWING_PROCESS';

// ACTIONS
type ActionsType = FollowUserType | UnfollowUserType | ToggleFollowingProcessType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | ToggleFetchingType

type FollowUserType = { type: typeof FOLLOW, userId: number }
type UnfollowUserType = { type: typeof UNFOLLOW, userId: number }
type ToggleFollowingProcessType = { type: typeof TOGGLE_FOLLOWING_PROCESS, bool: boolean, id: number }
type SetUsersType = { type: typeof SET_USERS, users: Array<UserType> }
type SetCurrentPageType = { type: typeof SET_CURRENT_PAGE, pageNumber: number }
type SetTotalUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT, totalCount: number }
type ToggleFetchingType = { type: typeof TOGGLE_FETCHING, bool: boolean }


export const followUser = (userId: number): FollowUserType => ({ type: FOLLOW, userId })
export const unfollowUser = (userId: number): UnfollowUserType => ({ type: UNFOLLOW, userId })
export const toggleFollowingProcess = (bool: boolean, id: number): ToggleFollowingProcessType => ({ type: TOGGLE_FOLLOWING_PROCESS, bool, id })
export const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users })
export const setCurrentPage = (pageNumber: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, pageNumber })
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleFetching = (bool: boolean): ToggleFetchingType => ({ type: TOGGLE_FETCHING, bool })

// THUNKS
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    try {
        dispatch(toggleFetching(true));
        dispatch(setCurrentPage(page));
        let response = await getUsersFromAPI(page, pageSize)
        dispatch(toggleFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount))
    } catch (e) {
        dispatch(errors(e))
    }
}

const _followUnfollow = async (dispatch: Dispatch<ActionsType>, userId: number, API: any, action: (userId: number) => FollowUserType | UnfollowUserType ) => {
    try {
        dispatch(toggleFollowingProcess(true, userId))
        let response = await API(userId)
        if (response.resultCode === 0) { 
            dispatch(action(userId)) 
            // dispatch(success()) 
        }
        dispatch(toggleFollowingProcess(false, userId))
    } catch (e) {
        // dispatch(errors(e))
    }
}

export const followToUser = (userId: number): ThunkType => async dispatch => {
    _followUnfollow(dispatch, userId, followToUserAPI, followUser)
}

export const unfollowFromUser = (userId: number): ThunkType => async dispatch => {
    _followUnfollow(dispatch, userId, unfollowFromUserAPI, unfollowUser)
}