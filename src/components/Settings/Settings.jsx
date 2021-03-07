import React, { useState } from 'react';
import s from './Settings.module.css'
import ProfileDataForm from './ProfileDataForm';
import StatusForm from './StatusForm';
import UserAvatar from '../UserAvatar/UserAvatar';


const Settings = ({profile, status, saveProfileData, updateStatus, updateUserAvatar }) => {
    let [avatar, setAvatar] = useState(profile.photos)

    const sendAvatar = () => {
        if (avatar && (avatar.type === "image/png" || avatar.type === "image/jpeg")) { 
            updateUserAvatar(avatar)
        }
    }

    const addAvatar = e => setAvatar(e.target.files[0])

    return (
        <div className={s.settings}>
            <h1 className={s.title}>Settings</h1>
            <div>
                <h3>Upload avatar</h3>
                <div className={s.avatar_wrapper}>
                    <UserAvatar photos={profile.photos.large} />
                </div>

                <input type="file" id='photo' onChange={addAvatar} className={s.photo}/>
                <button onClick={sendAvatar}>Save</button>
            </div>
            <div>
                <h3>Update your status</h3>
                <StatusForm initialValues={status} onSubmit={updateStatus} profile={profile} />
            </div>
            <div>
                <h3>Update your data</h3>
                <ProfileDataForm initialValues={profile} onSubmit={saveProfileData} profile={profile} />
            </div>
        </div>
    )   
}
    
export default Settings