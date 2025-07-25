import mongoose, { Model } from "mongoose";
import { IUser } from "./User.Model";
import { IComment } from "./Comment.Model";

export interface IPost {
    description: string,
    user: IUser,
    imageUrl?: string,
    likes?: string[],
    comments?: IComment[] 
}
export interface IPostDocument extends IPost, mongoose.Document {
    createdAt: Date,
    updatedAt: Date
}

const postSchema = new mongoose.Schema<IPostDocument>({
    description: {
        type: String,
        required: true,
    },
    user: {
        userID: {
            type: String,
            required: true,
        },
        ProfilePhoto: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    imageUrl: {
        type: String,
        default: "",
    },
    likes: {
        type: [String],
    },
    comments: [{
        // type: [String],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        }]

}, {
    timestamps: true,
});

const Post: Model<IPostDocument> = mongoose.models?.Post || mongoose.model<IPostDocument>("Post", postSchema);
export default Post;