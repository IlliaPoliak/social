import React from 'react';
import s from './Error404.module.css'
import {NavLink} from 'react-router-dom'


const Error404 = () => {
    return (
       <div className={s.error}>
           <h1 className={s.title}>404</h1>
           <h2 className={s.desc}>Not Found</h2>
           <NavLink to={`/profile`}>Go to Profile</NavLink>
       </div>
    )
}

export default Error404;