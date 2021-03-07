import React from 'react';
import noImage from '../../img/user.png';

const avatar = {
    width: '100%',
    height: 'auto'
}

const UserAvatar = ({ photos }) => {
return <img style={avatar} src={photos || noImage} alt='avatar' />
}

export default UserAvatar;