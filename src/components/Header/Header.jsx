import React, { useState, useEffect } from 'react';
import s from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import logo from '../../img/NASA_logo.png'
import Errors from '../Errors/Errors/Errors';
import Success from '../Errors/Success/Success';
import UserAvatar from '../UserAvatar/UserAvatar';


const Header = ({ isAuth, logout, errors, success, profile, authUserId }) => (
    <header className={s.header} >
        <div className={s.logo_wrapper}>
            <NavLink to='/'><img src={logo} alt='logo' className={s.logo} /></NavLink>
        </div>
        <div className={s.info}>Проект регулярно дорабатывается <br /> Следующая доработка - добавление стилей </div>
        <div className={s.login_block}>
            {isAuth && profile
                ? <div className={s.auth_data}>
                    <UserIsAuth profile={profile} authUserId={authUserId}  />
                    <button onClick={logout} className={s.loguot}>Log Out</button>
                </div>
                : <NavLink to='/login'><div className={s.login_btn}>Log in</div></NavLink>
            }
        </div>

        {errors && <Errors errors={errors} />}
        {success && <Success success={success} />}
    </header>
)

const UserIsAuth = ({profile, authUserId}) => {
    let [isAuth, setIsAuth] = useState(profile)

    useEffect(()=>{
        if (profile.userId === authUserId){
            setIsAuth(profile)
        }
    }, [profile, authUserId])
    
    return (
        <NavLink to='/profile'>
            <div className={s.data_wrapper}>
                <div className={s.avatar_wrapper}><UserAvatar photos={isAuth.photos.large} /></div>
                <div className={s.login}>{isAuth.fullName}</div>
            </div>
        </NavLink>
    )
}

export default Header;