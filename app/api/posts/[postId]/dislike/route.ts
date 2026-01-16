import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/Models/Post.Model";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await connectDB();
    const { userId } = await req.json();
    const { postId } = await params; // Must await in Next.js 15

    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: userId }
    });

    return NextResponse.json({ message: "Disliked successfully" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}