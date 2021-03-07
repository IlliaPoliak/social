import React from 'react';
import s from './FormsControls.module.css'

export const Input = ({ input, meta: { touched, error }, ...props }) => (
    <div className={touched && error ? `${s.formControl} ${s.error}` : s.formControl}>
        <input {...props} {...input} />
        {touched && error && <span>{error}</span>}
    </div>
)

export const Textarea = ({ input, meta: { touched, error }, ...props }) => (
    <div className={touched && error ? `${s.formControl} ${s.error}` : s.formControl}>
        <textarea {...props} {...input} />
        {touched && error && <span>{error}</span>}
    </div>
)