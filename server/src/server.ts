import express, { type Request, type Response } from "express";
import cors from "cors";
import { connectDB } from "./utils/dbConnect.js";
import User from "./models/User.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running with TypeScript!");
});

app.post("/api/addUser", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Username and email are required" });
    }

    const newUser = new User({ username:name, email });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User added successfully",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(409).json({ error: "Email already exists" });
    } else if (error.name === "ValidationError") {
      console.log("Error occured : ", error)
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/api/lookUser", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const userExists = await User.findOne({email});

    if(userExists){
      res.status(401).json({
        message: "User alrady exists",
      });
    }else{
      res.status(200).json({
        message: "User Email available",
      });
    }

    
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(409).json({ error: "Email already exists" });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Error occured", err));
