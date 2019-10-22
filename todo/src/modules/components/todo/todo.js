import React, { Component } from 'react';

import ToDoInput from '../todo-input/todo-input';
import ToDoList from '../todo-list/todo-list';
import Footer from '../footer/footer';

import { connect } from 'react-redux';
import { addTask, deleteTask, completeTask, deleteCompleted, checkAllTasks, uncheckAllTasks } from '../../reducers/tasks';
import { changeFilter } from '../../reducers/filters';

import './todo.css';
import Header from '../header/header';

class ToDo extends Component {
    state = {
        taskText: ''
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            taskText: value
        })
    }

    addTask = ({ key }) => {
        const { taskText } = this.state;

        if (taskText.length >= 1 && key === 'Enter') {
            const { addTask } = this.props;

            addTask((new Date()).getTime(), taskText, false);

            this.setState({
                taskText: '',
            })
        }
    }

    filterTasks = (tasks, activeFilter) => {
        switch (activeFilter) {
            case 'active': return tasks.filter((task) => !task.isCompleted)
            case 'completed': return tasks.filter((task) => task.isCompleted)

            default: return tasks;
        }
    }

    getCompletedTasksCounter = tasks => tasks.filter(task => task.isCompleted).length;

    render() {
        const { taskText } = this.state;
        const { tasks, deleteTask, completeTask, changeFilter, filters, deleteCompleted, checkAllTasks, uncheckAllTasks } = this.props;
        const filteredTasks = this.filterTasks(tasks, filters);
        const taskCounter = this.getCompletedTasksCounter(tasks);

        return (
            <div className='todo-wrapper'>
                <ToDoInput onKeyPress={this.addTask} onChange={this.handleInputChange} value={taskText} />
                <Header amount={taskCounter} all_tasks={tasks.length} deleteCompleted={deleteCompleted} checkAllTasks={checkAllTasks} uncheckAllTasks={uncheckAllTasks} />
                <ToDoList tasks={filteredTasks} deleteTask={deleteTask} completeTask={completeTask} />
                <Footer  activeFilter={filters} changeFilter={changeFilter} />
            </div>
        );
    }
}

export default connect(({ tasks, filters }) => ({
    tasks,
    filters
}), { addTask, deleteTask, completeTask, changeFilter, deleteCompleted, checkAllTasks, uncheckAllTasks })(ToDo);