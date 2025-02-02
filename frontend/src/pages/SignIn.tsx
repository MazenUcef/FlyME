import { Controller, useForm } from "react-hook-form"
import { UseLogin } from "../api/AuthApi"
import logo from '../assets/images/iconfinal.png'
import Logo200Px from "../assets/icons/Logo200Px"
import { Link } from "react-router-dom"


export type SignInFormData = {
    email: string,
    password: string,
}
const SignIn = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const { loginUserAccount, isLogging } = UseLogin()
    const onSubmit = (data: SignInFormData) => {
        loginUserAccount(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center h-full flex-col md:flex-row md:justify-around md:items-center gap-5">
            <div className="flex-1 flex flex-col">
                <h2 className="text-3xl mb-5 text-third font-bold">Login to Your Account</h2>
                <div className="mb-5">
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
                </div>
                <div>
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
                                Password
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
                </div>
                <span className="text-secondary text-xs font-semibold mt-5">Not registered? <Link to={'/register'} className="underline">Create an account here</Link></span>
                <button type="submit" className={`bg-fourth ${isLogging ? "cursor-not-allowed" : ""} text-secondary px-10 py-3 font-bold hover:text-third text-sm rounded-md mt-5`}>
                    {isLogging ? "Logging..." : "Login"}
                </button>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <Logo200Px />
                <h1 className="text-gray-500 font-bold text-lg">FLY ME &copy;</h1>
            </div>
        </form>
    )
}

export default SignIn