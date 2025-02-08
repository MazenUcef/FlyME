import { UseFetchHotelById, UseUpdateHotel } from "@/api/HotelApi"
import ManageHotelForm from "@/forms/ManageHotelForm"
import { useParams } from "react-router-dom"

const EditHotel = () => {
    const { UpdateHotel, isUpdating } = UseUpdateHotel()
    const { id } = useParams()
    if (!id) {
        return <div>Error: Hotel ID is missing</div>
    }
    const { data } = UseFetchHotelById(id)
    const handleUpdate = (formData: FormData) => {
        UpdateHotel(formData)
    }
    return <ManageHotelForm onSave={handleUpdate} isLoading={isUpdating} hotel={data} />
}

export default EditHotel