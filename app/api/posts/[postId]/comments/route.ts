import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/Models/Post.Model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> } // FIXED: postId (Capital I)
) {
  try {
    await connectDB();
    const { postId } = await params;

    const post = await Post.findById(postId).populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post.comments || []);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}