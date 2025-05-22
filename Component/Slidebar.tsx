import ProfilePhoto from '@/components/Shared/ProfilePhoto'
import { getAllPost } from '@/lib/serverAction'

import Image from 'next/image'
import React from 'react'

const Slidebar = async ({ user }: { user: any }) => {
  // console.log(user);
  const posts = await getAllPost();
  return (
    <div className='hidden md:block w-[20%] h-fit border border-gray-300 rounded-lg bg-white '>
      <div className='flex relative flex-col items-center'>
        <div className='w-full h-18 overflow-hidden'>
          {
            user && (
              <Image src={"/img.jpeg"} alt='banner' width={200} height={200} className='w-full h-18 rounded-t' />
            )
          }
        </div>
        <div className='my-1 absolute top-10'>
          <ProfilePhoto src={user ? user?.imageUrl : "/img.jpeg"} />
        </div>
        <div className='border-b border-b-gray-300'>
          <div className='p-2 mt-5 text-center '>
            <h1 className='font-bold hover:underline cursor-pointer'>{user ? `${user?.firstName} ${user?.lastName}` : "Harsh Vishwakarma"}</h1>
            <p className='text-xs'>@{user ? `${user?.username}` : "username"}</p>
            {/* <p className='text-xs'>{user ? `${user?.}` : "username"}</p> */}
          </div>
        </div>
      </div>
      <div className='text-xs'>
        <div className='w-full flex justify-between items-center px-3 py-3 hover:bg-gray-300 cursor-pointer'>
          <p>Post Impression </p>
          <p className='text-blue-600 font-bold'> 70</p>
        </div>
        <div className='w-full flex justify-between items-center px-3 py-3 hover:bg-gray-300 cursor-pointer'>
          <p>Post</p>
          <p className='text-blue-600 font-bold'>{posts.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Slidebar