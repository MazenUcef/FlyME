import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const UseCreateHotel = () => {
    const createAccount = async (formData: FormData) => {
        const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        if (!res.ok) {
            throw new Error("Faild to create a new hotel")
        }

        return res.json()
    }

    const { mutate: CreateHotel, isLoading } = useMutation({
        mutationFn: createAccount,
        onSuccess: async () => {
            toast.success("Hotel Created successfully!")
        },
        onError: (error: Error) => toast.error(error.message)
    })


    return {
        CreateHotel,
        isLoading,
    }
}