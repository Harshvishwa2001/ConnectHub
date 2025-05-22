import { Bell, BriefcaseBusiness, Home, Icon, icons, MessageCircleMore, User, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { JSX } from 'react/jsx-runtime';

type NavItemProps = {
    src: string;
    text: string;
    icon: JSX.Element;
}

const navItems : NavItemProps[] = [
    { src: "/home",text: "Home", icon: <Home/> },
    { src: "/networks",text: "Network", icon: <Users/> },
    { src: "/job",text: "Jobs", icon: <BriefcaseBusiness/> },
    { src: "/message",text: "Message", icon: <MessageCircleMore/> },
    { src: "/notification",text: "Notification", icon: <Bell/> },
];

const NavItem = () => {
  return (
    <div className='flex gap-10'>
        {
            navItems.map((navItems, index) => {
                return  (
                    <div key={index} className='flex flex-col items-center text-base cursor-pointer text-[#666666] hover:text-blue-800 '>
                        <span>{navItems.icon}</span>
                        <Link className='text-xs' href={navItems.src}>{navItems.text}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default NavItem