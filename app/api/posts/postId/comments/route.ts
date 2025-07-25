// import connectDB from "@/lib/db";
// import Post from "@/Models/Post.Model";
// import { NextRequest, NextResponse } from "next/server";

// // Get All Comments of a post
// // GET /api/posts/postId/comments
// export const GET =async (req:NextRequest, {params}:{params:{postid:Int32Array}}) => {
//     try {
//         await connectDB();
//         const post =Post.findById({ _id: params.postid });
//         if(!post) return NextResponse.json({error: 'Post not found'});

//         const comments = await post.populate({path:'comments',options:{sort:{createdAt:-1}}});
//         return NextResponse.json(comments);
//     } catch (error:any) {
//         return new NextResponse("An error occured");
        
//     }
// }   




import connectDB from "@/lib/db";
import Post from "@/Models/Post.Model";
import { NextRequest, NextResponse } from "next/server";

// Get All Comments of a post
export async function GET(
  req: NextRequest,
  context: { params: { postid: string } }
) {
  try {
    await connectDB();

    const post = await Post.findById(context.params.postid).populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post.comments);
  } catch (error) {
    console.error("Error fetching post comments:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}


