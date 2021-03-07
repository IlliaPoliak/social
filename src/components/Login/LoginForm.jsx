import React from 'react';
import s from './Login.module.css'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator, minLengthCreator } from '../../validators/validator';

const maxLength50 = maxLengthCreator(50)
const minLength4 = minLengthCreator(4)

const LoginForm = ({handleSubmit, error, captchaUrl}) =>{
    return (
        <form onSubmit={handleSubmit}>
            { error && <div className={s.formError}> E-mail or password is invalid </div> }
            <div> Login: 
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
                    validate={[required, maxLength50, minLength4]}
                />
            </div>
            <div className={s.remember_me_wrapper}>
                <Field component={Input} name='rememberMe' type="checkbox" id='rememberMe'/>
                <label htmlFor='rememberMe'>Remember me</label>  
            </div>
            { captchaUrl && <>
                <img src={captchaUrl} alt='captcha' />
                <Field 
                    component={Input} 
                    name='captcha' 
                    placeholder='Captcha' 
                    validate={[required]}
                />
            </>}
            <div> <button>Login</button> </div>
            
        </form>
    )
} 

export default reduxForm({ form: 'login'} )(LoginForm)
