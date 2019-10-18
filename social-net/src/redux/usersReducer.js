import { getUsersFromAPI, followToUserAPI, unfollowFromUserAPI } from '../api/api'

// CONSTANTS

const FOLLOW = 'usersReducer/FOLLOW';
const UNFOLLOW = 'usersReducer/UNFOLLOW';
const SET_USERS = 'usersReducer/SET_USERS';
const SET_CURRENT_PAGE = 'usersReducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'usersReducer/TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_PROCESS = 'usersReducer/TOGGLE_FOLLOWING_PROCESS';

// ACTIONS

export const followUser = (userId) => ({ type: FOLLOW, userId })
export const unfollowUser = (userId) => ({ type: UNFOLLOW, userId })
export const toggleFollowingProcess = (bool, id) => ({ type: TOGGLE_FOLLOWING_PROCESS, bool, id })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, pageNumber })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleFetching = (bool) => ({ type: TOGGLE_FETCHING, bool })

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProcess: []
}

export const usersReducer = (state = initialState, action) => {
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

// THUNKS

export const getUsers = (page, pageSize) => async dispatch => {
    dispatch(toggleFetching(true));
    dispatch(setCurrentPage(page));
    let response = await getUsersFromAPI(page, pageSize)
    dispatch(toggleFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount))
}

const followUnfollow = async (dispatch, userId, API, action) => {
    dispatch(toggleFollowingProcess(true, userId))
    let response = await API(userId)
    if (response.resultCode === 0){ dispatch(action(userId)) }
    dispatch(toggleFollowingProcess(false, userId))
}

export const followToUser = (userId) => dispatch => {
    followUnfollow(dispatch, userId, followToUserAPI, followUser)
}

export const unfollowFromUser = (userId) => dispatch => {
    followUnfollow(dispatch, userId, unfollowFromUserAPI, unfollowUser)
}