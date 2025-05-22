'use client'
import ProfilePhoto from '@/components/Shared/ProfilePhoto'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Trash2 } from 'lucide-react'
import React from 'react'
import { IPostDocument } from '@/Models/Post.Model'
import { useUser } from '@clerk/nextjs'
import PostContent from './PostContent'
import SocialOptions from './SocialOptions'
import ReactTimeAgo from 'react-timeago'
import { deletePostAction } from '@/lib/serverAction'


const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  // console.log(user);
  const FullName = post?.user?.firstName + " " + post?.user?.lastName;
  const loggedinUser = user?.id === post?.user?.userID;

  return (
    <div className='bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300  w-full'>
      <div className='flex gap-2 p-4'>
        <ProfilePhoto src={post?.user?.ProfilePhoto!} />
        <div className='flex items-center justify-between w-full'>
          <div>
            <h1 className='text-sm font-bold'>{FullName} <Badge variant={'secondary'} className='ml-2 '>You</Badge></h1>
            <p className='text-xs text-gray-500'>@{user ? user?.username : "username"}</p>
            <p className='text-xs text-gray-500'>
              <ReactTimeAgo date={new Date(post.createdAt)}></ReactTimeAgo>
            </p>
          </div>
        </div>
        <div>
          {
              loggedinUser && (
                <Button onClick={() => { 
            const res = deletePostAction(post._id as string); 
          }} 
            className='rounded-full ' variant={'outline'}>
            <Trash2 />
          </Button>
              )
          }
          
        </div>
      </div>
      <PostContent post={post} />
      <SocialOptions post={post}/>
    </div>
  )
}

export default Post