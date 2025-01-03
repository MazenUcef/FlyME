import { check } from "express-validator";

export const validateUserRegistration = [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
]

export const validateUserLogin = [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
]