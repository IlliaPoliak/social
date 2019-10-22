import React from 'react';
import PropTypes from 'prop-types';
import './todo-list.css';

import ToDoItem from '../todo-item/todo-item';

const ToDoList = ({ tasks, deleteTask, completeTask }) => {
   return <ul className='todo-list'>
       { tasks.map(({id, text, isCompleted})=>(
           <ToDoItem deleteTask={deleteTask} completeTask={completeTask} id={id} key={id + text} text={text} isCompleted={isCompleted} />
       ))}
   </ul>
};

ToDoList.propTypes = {
    tasks: PropTypes.array,
    deleteTask: PropTypes.func,
    completeTask: PropTypes.func,
}

ToDoList.defaultProps = {
    tasks: [],
    deleteTask: () => {},
    completeTask: () => {},
}

export default ToDoList;