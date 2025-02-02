import { body, check } from "express-validator";

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


export const hotelValidators = [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("price per night is required and must be a number"),
    body("startRating").notEmpty().isNumeric().withMessage("start rating is required and must be a number"),
    body("adultCount").notEmpty().isNumeric().withMessage("adult count is required and must be a number"),
    body("childCount").notEmpty().isNumeric().withMessage("child count is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("facilities is required")
]