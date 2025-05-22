import { IPostDocument } from '@/Models/Post.Model'
import Image from 'next/image'
import React from 'react'

const PostContent = ({ post }: { post: IPostDocument }) => {
    return (
        <div className='my-2 '>
            <p className='my-2 px-5'>{post?.description}</p>
            {
                post?.imageUrl && (
                    <Image
                        src={post?.imageUrl!}
                        alt='Post Image'
                        width={300}
                        height={300}
                        className='w-full  mx-auto' />
                        
                )
            }
        </div>
    )
}

export default PostContent