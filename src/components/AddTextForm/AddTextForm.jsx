import React from 'react';
import s from './AddTextForm.module.scss'
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../validators/validator';
import { Textarea } from '../common/FormsControls/FormsControls';

const maxLength1000 = maxLengthCreator(1000)

const addTextForm = ({handleSubmit, btnText}) => (
    <form onSubmit={handleSubmit}>
        <div className={s.fields_wrapper}>
            <Field
                component={Textarea}
                name='addInfo'
                placeholder="Write somehing..."
                validate={[required, maxLength1000]}
            />
        </div>
        <div>
            <button>{btnText}</button>
        </div>
    </form>
)

export default reduxForm({ form: 'addTextForm'} )(addTextForm)