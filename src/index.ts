import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary }  from "cloudinary";
import myUserRoute from "./routes/MyUserRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoutes";

dotenv.config();
mongoose
 .connect(process.env.MONGODB_CONNECTION_STRING as string)
 .then(() => console.log('Connected to database!'));

cloudinary.config({
    cloud_name: 'ddhdofx50',
    api_key: '764662927353585',
    api_secret: '_SkiYtRKcFIVZn8WtSjF0qhL93U'
})

const app = express();
app.use(cors());

// app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use("/api/order/checkout/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.get("/health", async(req: Request, res: Response ) => {
    res.send({ message: "health OK!" });
})

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant",restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
    console.log("Server started on localhost: 7000");
})

// this is by chris bakely