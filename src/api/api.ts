import { ProfileType } from './../types/types';
import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '26ba99b0-19f3-4b3d-9555-b2b2ccf1e039'
    }
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

//  Authorisation, LOGIN / LOGOUT 

type AuthMeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodes
    messages: Array<string>
}

export const getAuthUserDataFromAPI = () => instance
    .get<AuthMeResponseType>(`auth/me`)
    .then(response => response.data)

export const loginAPI = (email: string, password: string, rememberMe = false, captcha: null | string = null) => instance
    .post(`auth/login`, { email, password, rememberMe, captcha })
    .then(response => response.data)

export const logoutAPI = () => instance
    .delete(`auth/login`)
    .then(response => response.data)

export const getCaptchaAPI = () => instance
    .get(`security/get-captcha-url`)
    .then(response => response.data)

//  USERS

export const getUsersFromAPI = (currentPage: number, pageSize: number) => instance
    .get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data)

//  FOLLOW / UNFOLLOW

export const followToUserAPI = (UserId: number) => instance
    .post(`follow/${UserId}`)
    .then(response => response.data)

export const unfollowFromUserAPI = (UserId: number) => instance
    .delete(`follow/${UserId}`)
    .then(response => response.data)


// USER DATA / STATUS

export const getUserProfileDataFromAPI = (userId: number) => instance
    .get(`profile/${userId}`)
    .then(response => response.data)

export const getUserStatusFromAPI = (userId: number) => instance
    .get(`profile/status/${userId}`)
    .then(response => response.data)

export const putUserStatusFromAPI = (status: string) => instance
    .put(`profile/status`, status)
    .then(response => response.data)

export const saveUserAvatarAPI = (photo: string) => {
    const formData = new FormData()
    formData.append('image', photo)

    return instance.put(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data)
}

export const saveUserProfileDataAPI = (profile: ProfileType) => instance
    .put(`profile`, profile)
    .then(response => response.data)
