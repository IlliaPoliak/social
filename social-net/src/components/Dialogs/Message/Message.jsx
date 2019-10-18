import React from 'react';
import s from './Message.module.css'

const Message = ({text}) => <div className={s.message}>{text}</div>

export default Message;