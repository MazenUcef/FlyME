import { Controller, useForm } from "react-hook-form";
import { hotelFacilities, hotelTypes } from "../constants/Hotel-options-config";
import { useEffect } from "react";

export type HotelFormData = {
    _id: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    startRating: number;
    imageFiles: FileList;
    imagesUrls: string[]
}
type Props = {
    hotel?: HotelFormData;
    onSave: (HotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForm = ({ hotel, isLoading, onSave }: Props) => {
    const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<HotelFormData>({
        defaultValues: {
            name: "",
            city: "",
            country: "",
            description: "",
            type: "",
            adultCount: 0,
            childCount: 0,
            facilities: [],
            pricePerNight: 0,
            startRating: 0,
            imageFiles: undefined,
            imagesUrls: [],
        }
    })


    const existingImagesUrls = watch("imagesUrls");
    console.log(existingImagesUrls);

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        e.preventDefault()
        setValue('imagesUrls', existingImagesUrls.filter((url) => url !== imageUrl))
    }

    useEffect(() => {
        reset(hotel)
    }, [hotel, reset])
    const typeWatch = watch("type")

    const onSubmit = async (fromDataJson: HotelFormData) => {
        console.log(fromDataJson);
        const formData = new FormData();
    
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", fromDataJson.name);
        formData.append("city", fromDataJson.city);
        formData.append("country", fromDataJson.country);
        formData.append("description", fromDataJson.description);
        formData.append("type", fromDataJson.type);
        formData.append("adultCount", fromDataJson.adultCount.toString());
        formData.append("childCount", fromDataJson.childCount.toString());
        formData.append("pricePerNight", fromDataJson.pricePerNight.toString());
        formData.append("startRating", fromDataJson.startRating.toString());
    
        fromDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });
    
        if (fromDataJson?.imagesUrls) {
            fromDataJson.imagesUrls.forEach((url, index) => {
                formData.append(`imagesUrls[${index}]`, url);
            });
        }
    
        // ✅ FIX: Check if `imageFiles` exists before iterating
        if (fromDataJson.imageFiles && fromDataJson.imageFiles.length > 0) {
            Array.from(fromDataJson.imageFiles).forEach((imageFile) => {
                formData.append("imageFiles", imageFile);
            });
        }
    
        onSave(formData);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            <div className="flex items-center gap-10">
                <div className="flex-1">
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <label className="text-third text-sm font-bold flex-1">
                                Name
                                <input
                                    type="text"
                                    {...field}
                                    placeholder="Enter your name"
                                    className="border rounded w-full py-1 px-2 font-normal"
                                />
                                {errors.name && (
                                    <span className="text-red-400 text-sm">{errors.name?.message}</span>
                                )}
                            </label>
                        )}
                    />
                </div>
                <div className="flex-1">
                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: "city is required" }}
                        render={({ field }) => (
                            <label className="text-third text-sm font-bold flex-1">
                                City
                                <input
                                    type="text"
                                    {...field}
                                    placeholder="Enter your city"
                                    className="border rounded w-full py-1 px-2 font-normal"
                                />
                                {errors.city && (
                                    <span className="text-red-400 text-sm">{errors.city?.message}</span>
                                )}
                            </label>
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex-1">
                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: "country is required" }}
                        render={({ field }) => (
                            <label className="text-third text-sm font-bold flex-1">
                                Country
                                <input
                                    type="text"
                                    {...field}
                                    placeholder="Enter your country"
                                    className="border rounded w-full py-1 px-2 font-normal"
                                />
                                {errors.country && (
                                    <span className="text-red-400 text-sm">{errors.country?.message}</span>
                                )}
                            </label>
                        )}
                    />
                </div>
                <div className="flex-1">
                    <Controller
                        name="pricePerNight"
                        control={control}
                        rules={{ required: "city is required" }}
                        render={({ field }) => (
                            <label className="text-third text-sm font-bold flex-1">
                                Price Per Night
                                <input
                                    type="number"
                                    min={1}
                                    {...field}
                                    placeholder="Enter your Price Per Night"
                                    className="border rounded w-full py-1 px-2 font-normal"
                                />
                                {errors.pricePerNight && (
                                    <span className="text-red-400 text-sm">{errors.pricePerNight?.message}</span>
                                )}
                            </label>
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex-1">
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: "description is required" }}
                        render={({ field }) => (
                            <label className="text-third text-sm font-bold flex-1">
                                Description
                                <textarea
                                    {...field}
                                    placeholder="Enter your description"
                                    className="border rounded w-full py-1 px-2 font-normal"
                                />
                                {errors.description && (
                                    <span className="text-red-400 text-sm">{errors.description?.message}</span>
                                )}
                            </label>
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex-1">
                    <Controller
                        name="startRating"
                        control={control}
                        rules={{ required: "Start Rating is required" }}
                        render={({ field }) => (
                            <label className="text-third text-sm font-bold flex-1">
                                Start Rating
                                <select
                                    {...field}
                                    className="border rounded w-full py-1 px-2 font-normal"
                                >
                                    {[1, 2, 3, 4, 5].map((num, index) => (
                                        <option key={index} value={num}>{num}</option>
                                    ))}
                                </select>
                                {errors.startRating && (
                                    <span className="text-red-400 text-sm">{errors.startRating?.message}</span>
                                )}
                            </label>
                        )}
                    />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3">Type</h2>
                <div className="grid grid-cols-5 gap-2">
                    {hotelTypes.map((type, index) => (
                        <Controller
                            name="type"
                            key={index}
                            control={control}
                            rules={{ required: "Type is required" }}
                            render={({ field }) => (
                                <>
                                    <label className={
                                        typeWatch === type ?
                                            "cursor-pointer bg-gradient-to-l text-white from-third to-fourth text-sm rounded-full px-4 py-2 font-semibold"
                                            :
                                            "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
                                    }>
                                        <input {...field} className="hidden" type="radio" name="type" value={type} />
                                        <span>{type}</span>
                                    </label>
                                    {errors.type && (
                                        <span className="text-red-400 text-sm">{errors.type?.message}</span>
                                    )}
                                </>
                            )}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3">Facilities</h2>
                <div className="grid grid-cols-5 gap-3">
                    {hotelFacilities.map((facility, index) => (
                        <Controller
                            name="facilities"
                            key={index}
                            control={control}
                            rules={{
                                validate: (facilities) => {
                                    return facilities && facilities.length > 0
                                        ? true
                                        : "At least one facility must be selected";
                                },
                            }}
                            render={({ field }) => {
                                return (
                                    <>
                                        <label className="text-sm flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                {...field}
                                                value={facility}
                                                checked={field.value?.includes(facility)}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    field.onChange(
                                                        isChecked
                                                            ? [...(field.value || []), facility]
                                                            : field.value.filter((f: string) => f !== facility)
                                                    );
                                                }}
                                            />
                                            <span>{facility}</span>
                                        </label>
                                        {errors.facilities && (
                                            <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
                                        )}
                                    </>
                                );
                            }}
                        />
                    ))
                    }
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3">Guests</h2>
                <div className="grid grid-cols-2 rounded-lg gap-5 p-6 bg-gradient-to-l from-third to-fourth">
                    <Controller
                        name="adultCount"
                        control={control}
                        rules={{ required: "Adult's Count Rating is required" }}
                        render={({ field }) => (
                            <>
                                <label className=" text-sm font-semibold">
                                    <span className="text-white">Adults</span>
                                    <input
                                        {...field}
                                        type="number"
                                        min={1}
                                        className="border rounded mt-5 w-full py-2 px-3 font-normal"
                                    />
                                </label>
                                {
                                    errors.adultCount && (
                                        <span className="text-red-400 text-sm">{errors.adultCount?.message}</span>
                                    )
                                }
                            </>
                        )}
                    />
                    <Controller
                        name="childCount"
                        control={control}
                        rules={{ required: "Child's Count Rating is required" }}
                        render={({ field }) => (
                            <>
                                <label className="text-sm font-semibold">
                                    <span className="text-white">Childs</span>
                                    <input
                                        {...field}
                                        type="number"
                                        min={1}
                                        className="border rounded mt-5 w-full py-2 px-3 font-normal"
                                    />
                                </label>
                                {
                                    errors.childCount && (
                                        <span className="text-red-400 text-sm">{errors.childCount?.message}</span>
                                    )
                                }
                            </>
                        )}
                    />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3">Images</h2>
                <div className="border rounded p-4 flex flex-col gap-4">
                    {existingImagesUrls && (
                        <div className="grid grid-cols-6 gap-4">
                            {existingImagesUrls.map((url) => (
                                <div className="relative group">
                                    <img
                                        className="min-h-full object-cover"
                                        src={url}
                                        alt="hotel image"
                                    />
                                    <button onClick={(e) => handleDelete(e, url)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <Controller
                        name="imageFiles"
                        control={control}
                        rules={{
                            validate: (imageFiles) => {
                                const totalLength = imageFiles?.length + (existingImagesUrls?.length || 0)
                                if (totalLength === 0) {
                                    return "At least one image must be uploaded";
                                }
                                if (totalLength > 6) {
                                    return "Maximum 6 images can be uploaded";
                                }
                                return true;
                            },
                        }}

                        render={({ field }) => (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => field.onChange(e.target.files)}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                    className="w-full text-gray-700 font-semibold"
                                />
                                {
                                    errors.imageFiles && (
                                        <span className="text-red-500 text-sm font-bold">{errors.imageFiles?.message}</span>
                                    )
                                }
                            </>
                        )}
                    />
                </div>
            </div>
            <span className="flex justify-end">
                <button disabled={isLoading} type="submit" className={`${isLoading && "cursor-not-allowed opacity-45"} text-white py-2 px-10 font-bold rounded-lg hover:opacity-45 bg-gradient-to-l from-third to-fourth`}>
                    {
                        isLoading ? "Saving..." : "Save Hotel"
                    }
                </button>
            </span>
        </form>
    )
};

export default ManageHotelForm;