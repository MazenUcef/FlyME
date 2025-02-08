import { UseCreateHotel } from "@/api/HotelApi"
import ManageHotelForm from "../forms/ManageHotelForm"


const AddHotel = () => {
    const { CreateHotel, isLoading: isCreating } = UseCreateHotel()
    const handleCreate = (formData: FormData) => {
        CreateHotel(formData)
    }
    return (<ManageHotelForm onSave={handleCreate} isLoading={isCreating} />)
}

export default AddHotel