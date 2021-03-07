import React from 'react';
import s from './Login.module.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { login } from '../../reducers/authReducer';
import LoginForm from './LoginForm';


const Login = ({login, isAuth, captchaUrl}) => {
    const handleLoginFormSubmit = formData => {
        if (formData){
            let {email, password, rememberMe, captcha} = formData
            login(email, password, rememberMe, captcha)
        }
    }

    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div className={s.login_wrapper}>
            <h2>Login</h2>
            <div className={s.test_data}>
                For test: 
                <div>login: polakilyaser@gmail.com</div> 
                <div>password: 1111</div>
            </div>
            <LoginForm onSubmit={handleLoginFormSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

export default connect( state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
}) , { login })(Login);