import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/Models/Post.Model";

// GET: Fetch all likes for a post
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await connectDB();
    const { postId } = await params; // Must await in Next.js 15

    const post = await Post.findById(postId);
    return NextResponse.json(post?.likes || []);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

// POST: Add a like
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await connectDB();
    const { userId } = await req.json();
    const { postId } = await params; // Must await in Next.js 15

    if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    await Post.findByIdAndUpdate(postId, {
      $addToSet: { likes: userId }
    });

    return NextResponse.json({ message: "Liked successfully" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}