import React from 'react';
import s from './Success.module.css'


const Success = ({success}) => {

    return (
       <div className={s.success}>
           <div className={s.success_name}>{success}</div>
       </div>
    )
}

export default Success;