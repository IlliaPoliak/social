import React from 'react';
import s from './Settings.module.css'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../../components/common/FormsControls/FormsControls';

const StatusForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div>
            <Field
                component={Input}
                name='status'
                placeholder='Status'
            />
        </div>
        <div>
            <button>Save</button>
        </div>
    </form>
)

export default reduxForm({ form: 'status' })(StatusForm)