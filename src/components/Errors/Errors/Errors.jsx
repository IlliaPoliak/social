import React from 'react';
import s from './Errors.module.css'


const Errors = ({errors}) => {

    return (
       <div className={s.error}>
           <div className={s.error_name}>{errors.name}</div>
           <div className={s.error_message}>{errors.message}</div>
       </div>
    )
}

export default Errors;