import React from 'react';
import s from './Dialogs.module.scss'
import {NavLink} from 'react-router-dom'
import AddTextForm from '../AddTextForm/AddTextForm'

const Message = ({text}) => <div className={s.message}>{text}</div>
const DialogItem = ({ id, name }) => <div className={s.dialog}><NavLink to={`/dialogs/${id}`} activeClassName={s.active}>{name}</NavLink></div>

const Dialogs = ({dialogsPage, addMessage, reset}) => {
    let dialogsElements = dialogsPage.dialogs.map(({ id, name }) => <DialogItem key={`${id}+${name}`} id={id} name={name} />)
    let messagesElements = dialogsPage.messages.map(({ id, text }) => <Message key={`${id}+${text}`} id={id} text={text} />)

    const addNewMessage = newMessageBody => {
        addMessage(newMessageBody.addInfo)
        reset('addTextForm')
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialog_items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <AddTextForm 
                    onSubmit={addNewMessage} 
                    btnText='Send'
                />
            </div>
        </div>
    )
}

export default Dialogs;