import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {}
