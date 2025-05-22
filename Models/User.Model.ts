import mongoose, { Model } from "mongoose";

export interface IUser {
    firstName: string,
    lastName: string,
    userID: string,
    ProfilePhoto?: string,
    Bio?: string
}
export interface IUserDocument extends IUser, mongoose.Document {
    createdAt: Date,   
    updatedAt: Date
}

const userSchema = new mongoose.Schema<IUserDocument>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    ProfilePhoto: {
        type: String,
        default: "",
    },
    Bio: {
        type: String,
        default: "",
    },

}, {    
    timestamps: true,
});

const User : Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema);
export default User;