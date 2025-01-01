import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config"
import mongoose from 'mongoose';



mongoose.connect(process.env.MONGODB_CONNECTION as string)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection failed: ", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: "Hello from express!" });
})

app.listen(7000, () => {
    console.log("Server is running on port 7000");
})