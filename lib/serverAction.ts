"use server";

import Post from "@/Models/Post.Model";
import { IUser } from "@/Models/User.Model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import Comment from "@/Models/Comment.Model";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/* FETCH ALL POSTS */
export const getAllPost = async () => {
  try {
    await connectDB();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: 'comments', options: { sort: { createdAt: -1 } } })
      .lean(); // .lean() converts Mongoose docs to plain JS objects
    
    // This deep-cleans the objects so they are "JSON-safe" for Next.js
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return []; 
  }
};

/* CREATE POST */
export const createPostAction = async (inputText: string, selectedFile: string) => {
  try {
    await connectDB();
    const user = await currentUser();

    if (!user) throw new Error("User not found. Please sign in.");

    const userDatabase: IUser = {
      firstName: user.firstName || "User",
      lastName: user.lastName || "",
      userID: user.id,
      ProfilePhoto: user.imageUrl,
    };

    let imageUrl = "";
    if (selectedFile) {
      const uploadResponse = await cloudinary.uploader.upload(selectedFile);
      imageUrl = uploadResponse.secure_url;
    }

    await Post.create({
      description: inputText,
      user: userDatabase,
      imageUrl: imageUrl || undefined,
    });

    revalidatePath("/");
  } catch (error) {
    // FIXED: ESLint safe error handling
    const msg = error instanceof Error ? error.message : "Failed to create post";
    console.error("❌ createPostAction Error:", msg);
    throw new Error(msg);
  }
};

/* DELETE POST */
export const deletePostAction = async (postId: string) => {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    if (post.user.userID !== user.id) {
      throw new Error("You can only delete your own posts");
    }

    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to delete post";
    console.error("❌ deletePostAction Error:", msg);
    throw new Error(msg);
  }
};

/* CREATE COMMENT */
export const createCommentAction = async (postId: string, formData: FormData) => {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const inputText = formData.get("inputText") as string;
    if (!inputText) throw new Error("Comment text is required");

    const userDatabase: IUser = {
      firstName: user.firstName || "User",
      lastName: user.lastName || "",
      userID: user.id,
      ProfilePhoto: user.imageUrl,
    };

    const comment = await Comment.create({
      textMessage: inputText,
      user: userDatabase,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id }
    });

    revalidatePath("/");
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to create comment";
    console.error("❌ createCommentAction Error:", msg);
    throw new Error(msg);
  }
};