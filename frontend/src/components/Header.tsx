import { Link } from "react-router-dom"
import Logo100Px from "../assets/icons/Logo100Px"

const Header = () => {
    return (
        <div className="bg-gradient-to-l from-third to-fourth py-6">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link className="flex items-center" to={'/'}>
                        <span><Logo100Px /></span>
                        FlyME
                    </Link>
                </span>
                <span className="flex space-x-2">
                    <Link className="flex items-center px-6 py-2 bg-white text-third hover:text-secondary font-bold hover:bg-fourth rounded-lg" to={'/sign-in'}>SignIn</Link>
                </span>
            </div>
        </div>
    )
}

export default Header