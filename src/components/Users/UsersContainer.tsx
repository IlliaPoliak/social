import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { getUsers, followToUser, unfollowFromUser } from '../../reducers/usersReducer';
import Users from './Users'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import s from './Users.module.css'
import Pagination from '../common/Pagination/Pagination';
import { UserType } from '../../types/types';
import { AppStateType } from '../../reducers/store';
import { getUsersSelector } from './selectors'


class UsersContainer extends Component<PropsType> {

    componentDidMount() {
        let { pageSize, currentPage, getUsers } = this.props;
        getUsers(currentPage, pageSize)
    }

    handlePageNumberClick = (pageNumber: number) => {
        let { pageSize, getUsers } = this.props;
        getUsers(pageNumber, pageSize)
    }

    render = () => <>
        <div className={s.pagination_wrapper}>
            <Pagination 
                handlePageNumberClick={this.handlePageNumberClick} 
                totalItemsCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
            />
        </div>   
        <Users  
            users={this.props.users}
            followingProcess={this.props.followingProcess}
            followToUser={this.props.followToUser}
            unfollowFromUser={this.props.unfollowFromUser}
            isFetching={this.props.isFetching}
        />
    </>
}

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    followingProcess: Array<number>
}

type MapDispatchToPropsType = {
    followToUser: (userId: number) => void
    unfollowFromUser: (userId: number) => void
    getUsers: (pageNumber: number, pageSize: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    let { pageSize, totalUsersCount, currentPage, isFetching, followingProcess } = state.usersPage
    return { users: getUsersSelector(state), pageSize, totalUsersCount, currentPage, isFetching, followingProcess }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { getUsers, followToUser, unfollowFromUser }),
    withAuthRedirect
)(UsersContainer)