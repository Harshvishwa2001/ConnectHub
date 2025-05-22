import { Avatar,  AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const ProfilePhoto = ({ src }: { src: string }) => {
    return (
        <Avatar className='cursor-pointer'>
            <AvatarImage src={src} alt="profile" width={45} height={45} className='rounded-full'/>
        </Avatar>
    )
}

export default ProfilePhoto