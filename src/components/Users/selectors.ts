// import { createSelector } from 'reselect'
import { AppStateType } from '../../reducers/store'


export const getUsersSelector = (state: AppStateType) => state.usersPage.users