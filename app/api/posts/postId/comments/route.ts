// import connectDB from "@/lib/db";
// import Post from "@/Models/Post.Model";
// import { NextRequest, NextResponse } from "next/server";

// // Get All Comments of a post
// // GET /api/posts/postId/comments
// export const GET =async (req:NextRequest, {params}:{params:{postId:string}}) => {
//     try {
//         await connectDB();
//         const post =Post.findById({ _id: params.postId });
//         if(!post) return NextResponse.json({error: 'Post not found'});

//         const comments = await post.populate({path:'comments',options:{sort:{createdAt:-1}}});
//         return NextResponse.json(comments);
//     } catch (error:any) {
//         return new NextResponse("An error occured");
        
//     }
// }   

// Updates  Comments of a post

import connectDB from "@/lib/db";
import Post from "@/Models/Post.Model";
import { NextRequest, NextResponse } from "next/server";

// Get All Comments of a post
// GET /api/posts/postId/comments
export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();

    const post = await Post.findById(params.postId); // fix: add await here

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comments = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    return NextResponse.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err); // fix: actually use the error

    return new NextResponse("An error occurred", { status: 500 });
  }
};
