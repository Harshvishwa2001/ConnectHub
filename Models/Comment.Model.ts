import mongoose, { Model } from "mongoose";
import { IUser } from "./User.Model";

export interface IComment{
    textMessage: string,
    user: IUser,
}

export interface ICommentDocument extends IComment, mongoose.Document {
    createdAt: Date,
    updatedAt: Date
}

const commentSchema = new mongoose.Schema({
    textMessage: {
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
    }
}, {
    timestamps: true,
});

const Comment: Model<ICommentDocument> = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);
export default Comment;