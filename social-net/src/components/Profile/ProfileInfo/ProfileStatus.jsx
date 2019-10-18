import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css'


const ProfileStatus = props => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => { setStatus(props.status) }, [props.status])

    const activateEditMode = () => setEditMode(true)

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const handleUserStatusChange = (e) => setStatus(e.currentTarget.value)

    return (
        <div className={s.status_wrapper}>
            Status:
            { editMode &&
                <div>
                    <input
                        autoFocus
                        onChange={handleUserStatusChange}
                        onBlur={deactivateEditMode}
                        value={status}
                    />
                    <button onClick={deactivateEditMode}>Save</button>
                </div>
            }
            { !editMode &&
                <span
                    className={s.status}
                    onDoubleClick={activateEditMode} > 
                    {props.status || 'empty status...'}
                </span>
            }
        </div>
    )
}

export default ProfileStatus;