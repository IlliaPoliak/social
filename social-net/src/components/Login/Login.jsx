import React from 'react';
import s from './Login.module.css'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator, minLengthCreator } from '../../validators/validator';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/authReducer';

const maxLength50 = maxLengthCreator(50)
const minLength8 = minLengthCreator(6)

const LoginForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <div> Name: 
            <Field 
                component={Input} 
                name='email' 
                placeholder='E-mail' 
                validate={[required, maxLength50]}
            />
        </div>
        <div> Password: 
            <Field 
                component={Input} 
                name='password' 
                placeholder='Password' 
                type='password' 
                validate={[required, maxLength50, minLength8]}
            />
        </div>
        <div>
            <Field 
                component={Input} 
                name='rememberMe' 
                type="checkbox"
            /> 
            Remember me
        </div>
        <div>
            <button>Login</button>
        </div>
        { props.error &&  
            <div className={s.formError}>
                Email or password is invalid
            </div> 
        }
    </form>
)

const LoginReduxForm = reduxForm({ form: 'login'} )(LoginForm)

const Login = ({login, isAuth}) => {
    const onSubmit = formData => login(formData.email, formData.password, formData.rememberMe)

    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default connect( state => ({isAuth: state.auth.isAuth}) , { login })(Login);