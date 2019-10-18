import React from 'react';
import { NavLink } from 'react-router-dom'
import s from './DialogItem.module.css'

const DialogItem = ({ id, name }) => (
    <div className={s.dialog}>
        <NavLink to={`/dialogs/${id}`} activeClassName={s.active}>{name}</NavLink>
    </div>
)

export default DialogItem;