import mongoose, { Schema } from "mongoose";
import type { IUserDocument, IUserModel } from "../types/user.ts";

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [2, "Username must be at least 2 characters"],
      match: [
        /^[a-zA-Z\s'-]+$/,
        "Username can only contain letters, spaces, apostrophes, and hyphens",
      ],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email address"],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default User;
