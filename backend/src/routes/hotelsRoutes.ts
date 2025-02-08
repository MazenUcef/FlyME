import express from 'express';
import hotelController from '../controllers/hotelController';
import multer from 'multer';
import verifyToken from '../middlewares/verifyToken';
import { hotelValidators } from '../validators/userValidators';

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory as buffer
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/', verifyToken, hotelValidators, upload.array("imageFiles", 6), hotelController.createHotel)
router.get('/', verifyToken, hotelController.getHotels)
router.get('/:id', verifyToken, hotelController.getHotelById)
router.put('/:hotelId', verifyToken, upload.array("imageFiles"), hotelController.updateHotelById)

export default router