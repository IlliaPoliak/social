import React from 'react';
import s from './ProfileInfo.module.css'
import noImage from '../../../img/user.png'
import ProfileStatus from './ProfileStatus';


const ProfileInfo = ({profile: {contacts, photos, fullName, aboutMe }, status, updateStatus}) => {

    let contactsList = Object.entries(contacts).map(([contact, url]) => {
        return url && <div key={contact} >{`${contact}: ${url}`}</div>
    })
    
    let emptyContacts = contactsList.every( contact => contact === null)

    return (
        <div className={s.profile}>
            <div className={s.avatar_wrapper}>
                <img className={s.avatar} src={photos.large || noImage} alt='avatar' />
            </div>

            <div className={s.profile_info}>
                <div>Full name: {fullName}</div>
                <ProfileStatus status={status} updateStatus={updateStatus} />
                { aboutMe && <div>About me: {aboutMe}</div> }
                { !emptyContacts && <div className={s.contacts}>Contacts: {contactsList}</div> }
            </div>
        </div>
    )
}

export default ProfileInfo;