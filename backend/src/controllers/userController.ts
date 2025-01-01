import { Request } from "express";
import User from "../Models/user";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'



const SignUp = async (req: Request, res: any) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }


        const isEmailExisting = await User.findOne({ email });
        if (isEmailExisting) {
            return res.status(400).json({ message: "Email already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        return res.sendStatus(200)
    } catch (error) {
        console.error("Error during sign up:", error);
        return res.status(500).json({ message: "Server Error while sign up" });
    }
};

export default {
    SignUp,
};