import { UseGetHotels } from "@/api/HotelApi";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Baby, MapPin, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const MyHotels = () => {
    const { data } = UseGetHotels();

    return (
        <div className="space-y-5 flex flex-col">
            {/* Header */}
            <div className="flex justify-between mb-10 items-center">
                <h1 className="text-3xl font-bold text-gray-800">My Hotels</h1>
                <Link
                    to={"/add-hotel"}
                    className="text-white py-3 px-10 font-bold rounded-lg hover:opacity-80 bg-gradient-to-l from-third to-fourth shadow-lg transition-all"
                >
                    Add Hotel
                </Link>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data &&
                    data.length &&
                    data.map((hotel, index) => (
                        <Card
                            key={index}
                            className="relative cursor-pointer overflow-hidden shadow-md rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white/90 backdrop-blur-md"
                        >
                            {/* Hotel Image with Overlay */}
                            <div className="relative h-48 w-full">
                                <img
                                    src={hotel.imagesUrls?.[0] || "/default-hotel.jpg"}
                                    alt={hotel.name}
                                    className="h-full w-full object-cover rounded-t-2xl"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold">
                                    {hotel.name}
                                </div>
                            </div>

                            {/* Card Content */}
                            <CardContent className="p-6 space-y-4">
                                {/* Hotel Name & Description */}
                                <div className="flex flex-col space-y-2">
                                    <h2 className="text-2xl font-semibold text-gray-800">{hotel.name}</h2>
                                    <CardDescription className="text-gray-600 text-sm">{hotel.description}</CardDescription>
                                </div>

                                {/* Guests Info */}
                                <div className="flex items-center justify-start space-x-4 text-gray-600 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <UsersRound size={20} className="text-blue-500" />
                                        <span>{hotel.adultCount} Adults</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Baby size={20} className="text-pink-500" />
                                        <span>{hotel.childCount} Kids</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center text-gray-600">
                                    <MapPin size={20} className="text-red-500 mr-1" />
                                    <span className="font-medium">
                                        {hotel.city}, {hotel.country}
                                    </span>
                                </div>

                                {/* Facilities */}
                                <div className="text-sm text-gray-600">
                                    <h3 className="text-gray-700 font-semibold">Facilities:</h3>
                                    <ul className="list-disc list-inside">
                                        {hotel.facilities.map((facility, idx) => (
                                            <li key={idx} className="text-gray-500">{facility}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price & Rating */}
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">Price Per Night:</span>
                                        <span className="text-lg font-bold text-green-600">${hotel.pricePerNight}</span>
                                    </div>
                                    <StarRatings
                                        starRatedColor="yellow"
                                        rating={hotel.startRating}
                                        numberOfStars={5}
                                        starDimension="22px"
                                        starSpacing="2px"
                                        name="rating"
                                    />
                                </div>
                            </CardContent>

                            {/* Footer with "View Details" Button */}
                            <CardFooter className="p-6">
                                <Link
                                    to={`/edit-hotel/${hotel._id}`}
                                    className="w-full text-center text-white py-3 px-6 font-bold rounded-lg hover:opacity-80 bg-gradient-to-l from-third to-fourth shadow-md transition-all"
                                >
                                    View Details
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default MyHotels;
