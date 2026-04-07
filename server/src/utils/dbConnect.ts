import mongoose from "mongoose";

const mongoURI ="mongodb://localhost:27017/mydatabase";
export const connectDB = async (): Promise<void|null> => {
    try {
        return await mongoose
          .connect(mongoURI)
          .then(() => console.log("MongoDB Connected"))
          .catch((err) => console.log(err));
    } catch (error) {
        console.log("MongoDB connection failed : ", error);
        process.exit(1);
    }
}