import React from 'react';
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import logo from '../../img/NASA_logo.png'

const Header = ({isAuth, login, logout}) => (
        <header className={s.header} >
            <div className={s.logo_block}>
                <NavLink to='/'><img src={logo} alt='logo' /></NavLink>
            </div>

            <div className={s.login_block}>
                { isAuth
                    ? <div>{`You: ${login}`} <button onClick={logout}>Log Out</button></div>
                    : <NavLink to='/login'> Log in </NavLink>
                }
            </div>
        </header>
    )

export default Header;