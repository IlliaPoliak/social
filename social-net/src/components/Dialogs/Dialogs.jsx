import React from 'react';
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import s from './Dialogs.module.css'
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../validators/validator';
import {Textarea} from '../common/FormsControls/FormsControls';

const maxLength1000 = maxLengthCreator(1000)

const AddMessageForm = props => (
    <form onSubmit={props.handleSubmit}>
        <div className={s.message_text_wrapper}>
            <Field
                component={Textarea}
                name='addMessageField'
                placeholder="Message"
                validate={[required, maxLength1000]}
            />
        </div>
        <div className={s.send_btn_wrapper}>
            <button className={s.send_btn}>Send</button>
        </div>
    </form>
)

const AddMessageReduxForm = reduxForm({ form: 'addMessage'} )(AddMessageForm)

const Dialogs = ({dialogsPage, addMessage}) => {
    let dialogsElements = dialogsPage.dialogs.map(({ id, name }) => <DialogItem key={`${id}+${name}`} id={id} name={name} />)
    let messagesElements = dialogsPage.messages.map(({ id, text }) => <Message key={`${id}+${text}`} id={id} text={text} />)

    const addNewMessage = newMessageBody => addMessage(newMessageBody.addMessageField)

    return (
        <div className={s.dialogs}>
            <div className={s.dialog_items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

export default Dialogs;