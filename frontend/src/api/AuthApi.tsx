import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RegisterFormData } from "../pages/Register";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const UseRegister = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const createAccount = async (formData: RegisterFormData) => {
        const res = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()


        if (!res.ok) {
            throw new Error(data.message)
        }
    }

    const { mutate: createUserAccount, isLoading } = useMutation({
        mutationFn: createAccount,
        onSuccess: () => {
            toast.success("User registered successfully!")
            queryClient.invalidateQueries(["validateToken"])
            navigate('/')
        },
        onError: (error: Error) => toast.error(error.message)
    })


    return {
        createUserAccount,
        isLoading,
    }
}



export const useValidateToken = () => {
    const fetchValidateToken = async () => {
        const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to validate token");
        }

        return data;
    };

    const { isError } = useQuery({
        queryKey: ["validateToken"],
        queryFn: fetchValidateToken,
        retry: false
    })

    return {
        isLoggedIn: !isError,
    };
};