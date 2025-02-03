import { UseFetchHotelById } from "@/api/HotelApi"
import { useParams } from "react-router-dom"

const EditHotel = () => {
    const { id } = useParams()
    if (!id) {
        return <div>Error: Hotel ID is missing</div>
    }
    const { data } = UseFetchHotelById(id)
    console.log(data);
    
    return (
        <div>EditHotel</div>
    )
}

export default EditHotel