import mongoose from "mongoose";
const mongoURI = "mongodb+srv://omklachake_db_user:vEp9YBqZ82pJVZ58@cluster0.3cojcta.mongodb.net/";
export const connectDB = async () => {
    try {
        return await mongoose
            .connect(mongoURI)
            .then(() => console.log("MongoDB Connected"))
            .catch((err) => console.log(err));
    }
    catch (error) {
        console.log("MongoDB connection failed : ", error);
        process.exit(1);
    }
};
// vEp9YBqZ82pJVZ58
//# sourceMappingURL=dbConnect.js.map