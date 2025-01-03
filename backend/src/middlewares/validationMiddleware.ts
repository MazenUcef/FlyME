import { NextFunction, Request } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors = (req: Request, res: any, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err) => ({
                field: err.type,
                message: err.msg
            }))
        })
    }
    next()
};