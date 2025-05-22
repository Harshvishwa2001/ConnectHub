'use client'

import React, { useState } from 'react'
import { PostDialog } from '@/components/Shared/PostDialog'
import ProfilePhoto from '@/components/Shared/ProfilePhoto'
import { Input } from '@/components/ui/input'

const PostInput = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false)

  const handleInputClick = () => {
    setOpen(true)
  }

  return (
    <div className="bg-white p-4 m-2 md:m-0 border border-gray-300 shadow-xl rounded-lg w-full">
      <div className="flex items-center gap-3">
        <ProfilePhoto src={user?.imageUrl} />
        <Input
          type="text"
          placeholder="Start a post"
          className="rounded-full hover:bg-gray-100 h-10 w-full cursor-pointer"
          onClick={handleInputClick}
          readOnly // optional: prevent actual typing
        />
      </div>

      <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl} />
    </div>
  )
}

export default PostInput
