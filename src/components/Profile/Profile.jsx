import React, {useState} from 'react';
import s from './Profile.module.scss'
import UserAvatar from '../UserAvatar/UserAvatar';


const Profile = React.memo(({ profile, status }) => {
    let { contacts, photos, fullName, aboutMe, lookingForAJob, lookingForAJobDescription } = profile

    let contactsList = Object.entries(contacts)
        .filter(([contact, url]) => url && [contact, url])
        .map(([contact, url]) => <Contact key={contact} contact={contact} url={url} />)

    let [toggleShow, setToggleShow] = useState(false)

    const toggleShowInfo = () =>{
        setToggleShow(!toggleShow)
    }

    return (
        <div className={s.profile}>
            <div className={s.main_info}>
                <div className={s.avatar_wrapper}>
                    <UserAvatar photos={photos.large} />
                </div>
                <div className={s.info_wrapper}>
                    <h2 className={s.name}>{fullName}</h2>
                    {status && <span className={s.status}>{status || 'Мне лень заполнить статус :('}</span>}
                </div>
                <div className={s.arrow} onClick={toggleShowInfo}>{toggleShow ? <i>&#9650;</i> : <i>&#9660;</i>}</div>
            </div>
            
            { toggleShow &&
                <div className={s.profile_info}>  
                    { aboutMe && 
                        <div>About me: {aboutMe}</div>}
                    
                    { lookingForAJobDescription && 
                        <div>My skills: {lookingForAJobDescription}</div>}
                    
                    <div>Have a job: {String(lookingForAJob)}</div>
                    
                    {!!contactsList.length && 
                        <div className={s.contacts}>Links: {contactsList}</div>}
                </div>
            }
        </div>
    )
})

const Contact = ({ contact, url }) => <div>{`${contact}: `}<a href={url} target='_blank' rel='noopener noreferrer'>{url}</a></div>

export default Profile;