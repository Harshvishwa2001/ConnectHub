import React from 'react'
import PostInput from './PostInputs'
import Post from './Posts'
import { getAllPost } from '@/lib/serverAction';


const Feed = async({user}:{user:any}) => {
  const userData=JSON.parse(JSON.stringify(user));
  const posts=await getAllPost();

  return (
   <>
    <div className='flex-1'>
        <PostInput user={userData}/>
        <Post posts={posts!}/>
    </div>
   </>
  )
}

export default Feed