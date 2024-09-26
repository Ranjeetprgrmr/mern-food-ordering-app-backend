import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";

dotenv.config();
mongoose
 .connect(process.env.MONGODB_CONNECTION_STRING as string)
 .then(() => console.log('Connected to database!'));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);

app.get("/health", async(req: Request, res: Response ) => {
    res.send({ message: "health OK!" });
})

app.listen(7000, () => {
    console.log("Server started on localhost: 7000");
})

// this is by chris bakely