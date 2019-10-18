import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { toggleFollowingProcess } from './../../redux/usersReducer'
import { getUsers, followToUser, unfollowFromUser } from '../../redux/usersReducer';
import Users from './Users'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import s from './Users.module.css'
import Pagination from '../common/Pagination/Pagination';


class UsersContainer extends Component {

    componentDidMount() {
        let { pageSize, currentPage, getUsers } = this.props;
        getUsers(currentPage, pageSize)
    }

    handlePageNumberClick = pageNumber => {
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

let mapStateToProps = state => {
    let { users, pageSize, totalUsersCount, currentPage, isFetching, followingProcess } = state.usersPage
    return { users, pageSize, totalUsersCount, currentPage, isFetching, followingProcess }
}

export default compose(
    connect(mapStateToProps, { toggleFollowingProcess, getUsers, followToUser, unfollowFromUser }),
    withAuthRedirect
)(UsersContainer)