import { Controller, useForm } from "react-hook-form"
import { UseRegister } from "../api/AuthApi"
import { Link } from "react-router-dom"


export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}


const Register = () => {
    const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<RegisterFormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const { createUserAccount, isLoading } = UseRegister()


    const onSubmit = (data: RegisterFormData) => {
        createUserAccount(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-3xl text-third font-bold">Create Your Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                        <label className="text-third text-sm font-bold flex-1">
                            First Name
                            <input
                                type="text"
                                {...field}
                                placeholder="Enter your first name"
                                className="border rounded w-full py-1 px-2 font-normal"
                            />
                            {errors.firstName && (
                                <span className="text-red-400 text-sm">{errors.firstName.message}</span>
                            )}
                        </label>
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last Name is required" }}
                    render={({ field }) => (
                        <label className="text-third text-sm font-bold flex-1">
                            Last Name
                            <input
                                type="text"
                                {...field}
                                placeholder="Enter your last name"
                                className="border rounded w-full py-1 px-2 font-normal"
                            />
                            {errors.lastName && (
                                <span className="text-red-400 text-sm">{errors.lastName.message}</span>
                            )}
                        </label>
                    )}
                />
            </div>
            <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                    <label className="text-third text-sm font-bold flex-1">
                        Email
                        <input
                            type="email"
                            {...field}
                            placeholder="Enter your email"
                            className="border rounded w-full py-1 px-2 font-normal"
                        />
                        {errors.email && (
                            <span className="text-red-400 text-sm">{errors.email.message}</span>
                        )}
                    </label>
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long"
                    }
                }}
                render={({ field }) => (
                    <label className="text-third text-sm font-bold flex-1">
                        password
                        <input
                            type="password"
                            {...field}
                            placeholder="Enter your password"
                            className="border rounded w-full py-1 px-2 font-normal"
                        />
                        {errors.password && (
                            <span className="text-red-400 text-sm">{errors.password.message}</span>
                        )}
                    </label>
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    validate: (val) => {
                        if (!val) {
                            return "This field is required"
                        } else if (watch("password") !== val) {
                            return "Passwords do not match"
                        }
                    }
                }}
                render={({ field }) => (
                    <label className="text-third text-sm font-bold flex-1">
                        Confirm Password
                        <input
                            type="password"
                            {...field}
                            placeholder="Enter your password"
                            className="border rounded w-full py-1 px-2 font-normal"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>
                        )}
                    </label>
                )}
            />
            <span className="text-secondary text-xs font-semibold">Already registered? <Link className="underline" to={'/sign-in'}>Sign in here</Link></span>
            <button type="submit" className={`bg-fourth ${isLoading ? "bg-third" : "bg-fourth"} text-secondary p-2 font-bold hover:text-third text-sm rounded-md`}>
                {isLoading ? "Creating..." : "Create Account"}
            </button>
        </form>
    )
}

export default Register