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
        if (req.userId) {
            newHotel.userId = req.userId;
        } else {
            throw new Error("User ID is undefined");
        }

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}


export default {
    createHotel
}