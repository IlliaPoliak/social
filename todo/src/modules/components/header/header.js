import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
    state = {
        checked: false
    }

    handleCheckAll = () => {
        const { checkAllTasks, uncheckAllTasks } = this.props;
        this.setState({
            checked: !this.state.checked
        })
        this.state.checked ? uncheckAllTasks.call() : checkAllTasks.call()
    }

    render() {
        const { amount, all_tasks, deleteCompleted } = this.props;

        return (
            <div className='header'>
                <div className='info'>
                    <span className='all-tasks'>All: {all_tasks}</span>
                    <span className='active-tasks'>{all_tasks - amount}</span>
                    <span className='completed-tasks'>{amount}</span>
                </div>
                <button className='clear-completed' onClick={this.handleCheckAll}>Check all</button>
                <button className='clear-completed' onClick={deleteCompleted}>Clear</button>
            </div>
        )
    }
}

Header.propTypes = {
    amount: PropTypes.number,
    all_tasks: PropTypes.number,
    deleteCompleted: PropTypes.func,
    checkAllTasks: PropTypes.func,
    uncheckAllTasks: PropTypes.func,
}

Header.defaultProps = {
    amount: 0,
    all_tasks: 0,
    deleteCompleted: () => { },
    checkAllTasks: () => { },
    uncheckAllTasks: () => {}
}

export default Header;