import React from 'react';
import {NavLink} from 'react-router-dom'
import s from './Navbar.module.scss'

const Navbar = () => (
    <nav className={s.nav}>
        <div className={s.item} >
            <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
        </div>

        <div className={s.item}>
            <NavLink to='/dialogs' activeClassName={s.active}>Messages</NavLink>
        </div>
        
        <div className={s.item} >
            <NavLink to='/users' activeClassName={s.active}>Find users</NavLink>
        </div>

        <div className={s.item}>
            <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
        </div>
    </nav>
)

export default Navbar;