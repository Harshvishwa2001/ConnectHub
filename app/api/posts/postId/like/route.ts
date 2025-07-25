// import connectDB from "@/lib/db";
// import Post from "@/Models/Post.Model";
// import { NextRequest, NextResponse } from "next/server";

// // get likes
// export const GET = async (req:NextRequest, {params}:{params:{postId:string}}) => {
//     try {
//         await connectDB();
//         const post = await Post.findById({_id:params.postId});
//         if(!post) return NextResponse.json({error:'Post not found.'});
//         return NextResponse.json(post.likes);
//     } catch (error:any) {
//         return NextResponse.json({error:'An error occurred.'});
//     }
// }
// // post likes
// export const POST = async (req:NextRequest, {params}:{params:{postId:string}}) => {
//   console.log(params.postId);
//   console.log(typeof params.postId);
//     try {
//         await connectDB();
//         const userId = await req.json();
//         const post = await Post.findById({_id:params.postId});
//         if(!post) return NextResponse.json({error:'Post not found.'});
//         await post.updateOne({$addToSet:{likes:userId}});
//         return NextResponse.json({message:"Post liked successfully."});
//     } catch (error:any) {
//         return NextResponse.json({error:'An error occurred.'});
//     }
// }

// Update likes

import connectDB from "@/lib/db";
import Post from "@/Models/Post.Model";
import { NextRequest, NextResponse } from "next/server";

// GET /api/posts/:postId/like - Get all likes
export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();

    const post = await Post.findById({ _id: params.postId });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json(post.likes);
  } catch (err) {
    console.error("Error fetching likes:", err); // ✅ use the error
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};

// POST /api/posts/:postId/like - Like a post
export const POST = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectDB();

    const userId = await req.json();
    const post = await Post.findById({ _id: params.postId });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await post.updateOne({ $addToSet: { likes: userId } });

    return NextResponse.json({ message: "Post liked successfully." });
  } catch (err) {
    console.error("Error liking post:", err); // ✅ use the error
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
