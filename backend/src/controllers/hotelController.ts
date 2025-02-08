import { Request, Response } from "express"
import cloudinary from "cloudinary"
import Hotel, { HotelType } from "../Models/hotel";


const createHotel = async (req: Request, res: Response): Promise<void> => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const imageUrls = await uploadImages(imageFiles);

        newHotel.imagesUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        if (!req.userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
    if (!imageFiles || imageFiles.length === 0) return [];

    return await Promise.all(
        imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURI = `data:${image.mimetype};base64,${b64}`;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        })
    );
}



const getHotels = async (req: Request, res: Response): Promise<void> => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });

        res.status(200).send({
            status: "Hotels fetched successfully",
            data: hotels
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const getHotelById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId
        })
        if (!hotel) {
            res.status(404).json({ message: "Hotel not found" });
            return;
        }
        res.status(200).send({
            status: "Hotel fetched successfully",
            data: hotel
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}




export const updateHotelById = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.hotelId,
                userId: req.userId,
            },
            updatedHotel,
            { new: true }
        );

        if (!hotel) {
            res.status(404).json({ message: "Hotel not found" });
            return
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imagesUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imagesUrls || []),
        ];

        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Something went throw" });
    }
};



export default {
    createHotel,
    getHotels,
    getHotelById,
    updateHotelById
}