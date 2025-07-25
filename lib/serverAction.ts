// "use server";

// import Post from "@/Models/Post.Model";
// import { IUser } from "@/Models/User.Model";
// import { currentUser } from "@clerk/nextjs/server";
// import { v2 as cloudinary } from 'cloudinary';
// import connectDB from "./db";
// import { revalidatePath } from "next/cache";
// import Comment from "@/Models/Comment.Model";

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key: process.env.API_KEY,        
//         api_secret: process.env.API_SECRET 
      
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();

// // Create a Post using a server
// export const createPostAction = async (inputText: string, selectedFile: string) => {
//     await connectDB();
//     const user =await currentUser();
//     if(!user) throw new Error("User not found");
//     if(!inputText) throw new Error("Input text is required");
//     const image = selectedFile;

//     const userDatabase:IUser={
//         firstName: user.firstName || "Harsh",
//         lastName: user.lastName || "Vishwakarma",
//         userID  : user.id,
//         ProfilePhoto: user.imageUrl || "https://images.unsplash.com/photo-1677631231234",   
//     }
//     let uploadResponse;
//     try {
//         // create a new post with image
//         if(image) {
//             uploadResponse = await cloudinary.uploader.upload(image);
//             await Post.create({
//                 description: inputText,
//                 user: userDatabase,
//                 imageUrl: uploadResponse?.secure_url,
//             })
//         }else {
//             // create a new post without image
//             await Post.create({
//                 description: inputText,
//                 user: userDatabase,
//             })  
//         }
//         revalidatePath("/");
//     } catch {
//     //    throw new Error(error.message);
//     // console.log(error);
        
//     }

// }

// // Get all Posts using server 
// export const getAllPost =async ()=>{
//     await connectDB();
//     try {
//         const posts =await Post.find().sort({createdAt:-1}).populate({path:'comments',options:{sort:{createdAt:-1}}});
//         if(!posts )return [];
//         // console.log(posts)
//         return  JSON.parse(JSON.stringify(posts));
//     } catch (error) {
//         console.log(error)
//     }   
// }

// // Delete a Post using server
// export const deletePostAction =async(postId:string)=>{
//     await connectDB();
//     const user =await currentUser();
//     if(!user) throw new Error("User not found");
//     const post =await Post.findById(postId);
//     if(!post) throw new Error("Post ID is not found");

//     // Delete the post
//     if(post.user.userID !== user.id) {
//         throw new Error("You are not authorized to delete this post");
//     }
//     try {
//         await Post.deleteOne({_id: postId});
//         revalidatePath("/");
//     } catch  {
//         throw new Error("An Error Occured");
//     }
// }

// // Comment on a Post using server

// export const createCommentAction = async (postId: string, formData: FormData) => {
//     try {
//         const user = await currentUser();
//         if (!user) throw new Error("User not authenticated");
//         const inputText = formData.get('inputText') as string;
//         if (!inputText) throw new Error("Field is required");
//         if (!postId) throw new Error("Post id required");

//         const userDatabase: IUser = {
//             firstName: user.firstName || "Harsh",
//             lastName: user.lastName || "Vishwakarma",
//             userID: user.id,
//             ProfilePhoto: user.imageUrl
//         }
//         const post = await Post.findById({ _id: postId });
//         if (!post) throw new Error('Post not found');

//         const comment = await Comment.create({
//             textMessage: inputText,
//             user: userDatabase,
//         });

//         post.comments?.push(comment);
//         await post.save();

//         revalidatePath("/");
//     } catch(error: any) {
//         // console.log(error);
//         throw new Error("An error occured");
//     }
// }


"use server";

import Post from "@/Models/Post.Model";
import { IUser } from "@/Models/User.Model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import Comment from "@/Models/Comment.Model";

(async function () {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      { public_id: "shoes" }
    );

    console.log(uploadResult);

    const optimizeUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log(optimizeUrl);

    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);
  } catch (error) {
    console.error("Cloudinary example failed:", error);
  }
})();

// Create Post
export const createPostAction = async (inputText: string, selectedFile: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  if (!inputText) throw new Error("Input text is required");

  const userDatabase: IUser = {
    firstName: user.firstName || "Harsh",
    lastName: user.lastName || "Vishwakarma",
    userID: user.id,
    ProfilePhoto: user.imageUrl || "https://images.unsplash.com/photo-1677631231234",
  };

  try {
    let uploadResponse;
    if (selectedFile) {
      uploadResponse = await cloudinary.uploader.upload(selectedFile);
      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error in createPostAction:", error);
  }
};

// Get all Posts
export const getAllPost = async () => {
  await connectDB();
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "comments", options: { sort: { createdAt: -1 } } });
    return posts ? JSON.parse(JSON.stringify(posts)) : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// Delete Post
export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not found");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post ID is not found");

  if (post.user.userID !== user.id) {
    throw new Error("You are not authorized to delete this post");
  }

  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error deleting post:", error);
    throw new Error("An Error Occurred while deleting post");
  }
};

// Comment on Post
export const createCommentAction = async (postId: string, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const inputText = formData.get("inputText") as string;
    if (!inputText) throw new Error("Field is required");
    if (!postId) throw new Error("Post id required");

    const userDatabase: IUser = {
      firstName: user.firstName || "Harsh",
      lastName: user.lastName || "Vishwakarma",
      userID: user.id,
      ProfilePhoto: user.imageUrl,
    };

    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post not found");

    const comment = await Comment.create({
      textMessage: inputText,
      user: userDatabase,
    });

    post.comments?.push(comment);
    await post.save();
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error in createCommentAction:", error);
    throw new Error("Failed to create comment");
  }
};
