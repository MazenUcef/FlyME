import { NextFunction, Request, Response } from "express";
import User from "../Models/user";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'



const SignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }


        const isEmailExisting = await User.findOne({ email });
        if (isEmailExisting) {
            res.status(400).json({ message: "Email already exists" });
            return;
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
            sameSite: "strict",
        })
        const userObject = user.toObject()
        const { password: userPassword, ...data } = userObject
        res.status(200).send({
            message: "User created successfully",
            data,
        })
    } catch (error) {
        console.error("Error during sign up:", error);
        next(error)
    }
};

const SignIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
            sameSite: "strict",
        });
        const userObject = user.toObject();
        const { password: userPassword, ...data } = userObject;
        res.status(200).send({
            message: "User logged in successfully",
            status: "success",
            data,
            userId: user._id
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


const validateToken = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({ userId: req.userId })
}


const SignOut = async (req: Request, res: Response): Promise<void> => {
    try {
        res.cookie('auth_token', "", {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict'
        });
        res.status(200).json({ message: "Logged out successfully" }); 
    } catch (error) {
        console.error("Error during sign out:", error);
        res.status(500).json({ message: "Logout failed" });
    }
}


export default {
    SignOut,
    SignUp,
    SignIn,
    validateToken
};