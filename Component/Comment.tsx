import ProfilePhoto from '@/components/Shared/ProfilePhoto'
import { ICommentDocument } from '@/Models/Comment.Model'
import React from 'react'
import ReactTimeago from 'react-time-ago'

// Proper imports for javascript-time-ago
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// Safer initialization: try to add the locale, ignore if already added
try {
  TimeAgo.addDefaultLocale(en)
} catch (error) {
  // Locale might already be registered from a previous hot-reload
}

const Comment = ({ comment }: { comment: ICommentDocument }) => {
    // Ensure we have a valid date object
    const commentDate = comment?.createdAt ? new Date(comment.createdAt) : new Date();

    return (
        <div className='flex gap-2 my-4'>
            <div className='mt-2'>
                <ProfilePhoto src={comment?.user?.ProfilePhoto || ""} />
            </div>
            <div className='flex flex-1 justify-between p-3 bg-[#F2F2F2] rounded-lg'>
                <div>
                    <h1 className='text-sm font-medium'>
                        {`${comment?.user?.firstName || 'User'} ${comment?.user?.lastName || ''}`}
                    </h1>
                    <p className='text-xs text-gray-500'>@{comment?.user?.firstName?.toLowerCase()}</p>
                    <p className='my-2 text-sm text-gray-800'>{comment.textMessage}</p>
                </div>
                <div className='flex-shrink-0'>
                    <p className='text-xs text-gray-500'>
                        <ReactTimeago date={commentDate} locale="en-US" />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment;