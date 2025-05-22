// import connectDB from "@/lib/db";
// import Post from "@/Models/Post.Model";
// import { NextRequest, NextResponse } from "next/server";

// // post likes
// export const POST = async (req:NextRequest, {params}:{params:{postId:string}}) => {
//     try {
//         await connectDB();
//         const userId = await req.json();
//         const post = await Post.findById({_id:params.postId});
//         if(!post) return NextResponse.json({error:'Post not found.'});
//         await post.updateOne({$pull:{likes:userId}});
//         return NextResponse.json({message:"Post disliked successfully."});
//     } catch (error:any) {
//         return NextResponse.json({error:'An error occurred.'});
//     }
// }

// Update 

import connectDB from "@/lib/db";
import Post from "@/Models/Post.Model";
import { NextRequest, NextResponse } from "next/server";

// POST /api/posts/:postId/dislike
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

    await post.updateOne({ $pull: { likes: userId } });

    return NextResponse.json({ message: "Post disliked successfully." });
  } catch (err) {
    console.error("Error disliking post:", err); // ✅ error is now used

    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
