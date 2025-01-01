import { Link } from "react-router-dom"
import Logo from '../assets/images/iconfinal.png'

const Footer = () => {
    return (
        <div className="bg-gradient-to-l from-third to-fourth py-1">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <img src={Logo} className="w-28" alt="logo"/>
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p>&copy; FlyME. All rights reserved.</p>
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <Link to={'/policy'} className="text-white hover:text-secondary">Privacy Policy</Link>
                    <Link to={'/terms'} className="text-white hover:text-secondary">Terms of Services</Link>
                </span>
            </div>
        </div>
    )
}

export default Footer