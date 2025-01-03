import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config"
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'



mongoose.connect(process.env.MONGODB_CONNECTION as string)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection failed: ", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users" , userRoutes)
app.use("/api/auth" , authRoutes)

app.listen(7000, () => {
    console.log("Server is running on port 7000");
})
