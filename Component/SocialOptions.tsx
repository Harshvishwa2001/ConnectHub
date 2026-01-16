"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircleMore, Repeat, Send } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { IPostDocument } from '@/Models/Post.Model';
import CommentInput from './CommentInput';
import Comments from './Comments';

const SocialOptions = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState<string[]>(post.likes || []);
    const [commentOpen, setCommentOpen] = useState(false);

    useEffect(() => {
        if (user) setLiked(likes.includes(user.id));
    }, [user, likes]);

    const handleLike = async () => {
        if (!user) return;

        const isCurrentlyLiked = liked;
        const previousLikes = likes;

        // Optimistic State
        setLiked(!isCurrentlyLiked);
        setLikes(isCurrentlyLiked ? likes.filter(id => id !== user.id) : [...likes, user.id]);

        try {
            const action = isCurrentlyLiked ? 'dislike' : 'like';
            const res = await fetch(`/api/posts/${post._id}/${action}`, {
                method: 'POST',
                body: JSON.stringify({ userId: user.id }),
            });

            if (!res.ok) throw new Error();

            // Sync with DB
            const syncRes = await fetch(`/api/posts/${post._id}/like`);
            const data = await syncRes.json();
            setLikes(data);
        } catch (err) {
            setLiked(isCurrentlyLiked);
            setLikes(previousLikes);
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between px-4 py-2 border-b'>
                <p className='text-xs text-gray-500'>{likes.length} likes</p>
                <p onClick={() => setCommentOpen(!commentOpen)} className='text-xs text-gray-500 cursor-pointer hover:underline'>
                    {post.comments?.length || 0} comments
                </p>
            </div>
            <div className='flex justify-between p-1'>
                <Button variant='ghost' onClick={handleLike} className={liked ? 'text-blue-600' : 'text-gray-600'}>
                    <ThumbsUp size={20} className={liked ? 'fill-blue-600' : ''} /> Like
                </Button>
                <Button variant='ghost' onClick={() => setCommentOpen(!commentOpen)} className='text-gray-600'>
                    <MessageCircleMore size={20} /> Comment
                </Button>
                <Button variant='ghost' className='text-gray-600'><Repeat size={20} /> Repost</Button>
                <Button variant='ghost' className='text-gray-600'><Send size={20} /> Send</Button>
            </div>
            {commentOpen && (
                <div className='p-4 border-t'>
                    <CommentInput postId={String(post._id)} />
                    <Comments post={post} />
                </div>
            )}
        </div>
    );
};

export default SocialOptions;