import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RegisterFormData } from "../pages/Register";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SignInFormData } from "../pages/SignIn";


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
        onSuccess: async () => {
            toast.success("User registered successfully!")
            await queryClient.invalidateQueries(["validateToken"])
            navigate('/')
        },
        onError: (error: Error) => toast.error(error.message)
    })


    return {
        createUserAccount,
        isLoading,
    }
}

export const UseLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginUser = async (formData: SignInFormData) => {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Login failed");  // Throw an error if login is unsuccessful
        }

        return data;
    };

    const { mutate: loginUserAccount, isLoading: isLogging } = useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            toast.success("Logged in successfully!");
            await queryClient.invalidateQueries(["validateToken"]);
            navigate('/');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });


    return {
        loginUserAccount,
        isLogging,
    }
};


export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logoutUser = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
            return
        }
    }
    const { mutate: logoutUserAccount, isLoading: isLoggingOut } = useMutation({
        mutationFn: logoutUser,
        onSuccess: async () => {
            toast.success("Logged out successfully!")
            await queryClient.invalidateQueries(["validateToken"])
            navigate('/login')
        },
        onError: (error: Error) => toast.error(error.message)
    })


    return {
        logoutUserAccount,
        isLoggingOut,
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