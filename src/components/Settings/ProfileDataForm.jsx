import React from 'react';
import s from './Settings.module.css'
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../validators/validator';
import { Input } from '../common/FormsControls/FormsControls';

const maxLength50 = maxLengthCreator(50)

const ProfileDataForm = ({handleSubmit, error, profile}) => (
    <form onSubmit={handleSubmit}>
        <div>
            My name: <Field
                component={Input}
                name='fullName'
                placeholder='Name'
                validate={[required, maxLength50]}
            />
            About me: <Field
                component={Input}
                name='aboutMe'
                placeholder='aboutMe'
                validate={[required, maxLength50]}
            />
            Have a job: <div className={s.checkbox_label}>         
                <Field component={Input} type='checkbox' name='lookingForAJob' /> 
                <label htmlFor="lookingForAJob">lookingForAJob</label>
            </div>
            My skills: <Field
                component={Input}
                name='lookingForAJobDescription'
                placeholder='Your skills'
                validate={[required, maxLength50]}
            />
            <div>Contacts:</div>
            {   profile &&
                Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        {key}: <Field 
                            component={Input}
                            name={`contacts.${key}`}
                            placeholder='URL'
                        />
                    </div>
                })
            }
        </div>
        <div>
            <button>Save</button>
        </div>
        { error &&  
            <div className={s.formError}>
                {error}
            </div> 
        }
    </form>
)

export default reduxForm({ form: 'edit-profile' })(ProfileDataForm)