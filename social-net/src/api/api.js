import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '599f93de-41b3-41ab-9f81-f8df47a971a2'
    }
})

//  Authorisation, LOGIN / LOGOUT 

export const getAuthUserDataFromAPI = () => instance
    .get(`auth/me`)
    .then(response => response.data)

export const loginAPI = (email, password, rememberMe = false) => instance
    .post(`auth/login`, { email, password, rememberMe })
    .then(response => response.data)

export const logoutAPI = () => instance
    .delete(`auth/login`)
    .then(response => response.data)

//  USERS

export const getUsersFromAPI = (currentPage, pageSize) => instance
    .get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data)

//  FOLLOW / UNFOLLOW

export const followToUserAPI = id => instance
    .post(`follow/${id}`)
    .then(response => response.data)

export const unfollowFromUserAPI = id => instance
    .delete(`follow/${id}`)
    .then(response => response.data)


// USER DATA / STATUS

export const getUserProfileDataFromAPI = userId => instance
    .get(`profile/${userId}`)
    .then(response => response.data)

export const getUserStatusFromAPI = userId => instance
    .get(`/profile/status/${userId}`)
    .then(response => response.data)

export const putUserStatusFromAPI = status => instance
    .put(`/profile/status`, { status })
    .then(response => response.data)