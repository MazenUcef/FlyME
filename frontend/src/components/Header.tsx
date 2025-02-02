import { useState } from "react";
import { Link } from "react-router-dom";
import Logo100Px from "../assets/icons/Logo100Px";
import { useLogout, useValidateToken } from "../api/AuthApi";

const Header = () => {
    const { isLoggedIn } = useValidateToken();
    const { isLoggingOut, logoutUserAccount } = useLogout();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        logoutUserAccount();
        setShowLogoutModal(false);
    };

    return (
        <div className="bg-gradient-to-l from-third to-fourth py-6">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link className="flex items-center" to={'/'}>
                        <span><Logo100Px /></span>
                        FlyME
                    </Link>
                </span>
                <span className="flex space-x-2 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link className="flex items-center text-white px-3 font-bold hover:text-secondary" to={"/my-bookings"}>My Bookings</Link>
                            <Link className="flex items-center text-white px-3 font-bold hover:text-secondary"to={"/my-hotels"}>My Hotels</Link>
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="flex items-center px-6 py-2 bg-white text-third hover:text-secondary font-bold hover:bg-fourth rounded-lg"
                            >
                                {isLoggingOut ? "Logging out..." : "SignOut"}
                            </button>
                        </>
                    ) : (
                        <Link className="flex items-center px-6 py-2 bg-white text-third hover:text-secondary font-bold hover:bg-fourth rounded-lg" to={'/sign-in'}>
                            SignIn
                        </Link>
                    )}
                </span>
            </div>


            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Are you sure you want to log out?</h2>
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={handleLogout} 
                                className="bg-fourth text-white px-4 py-2 rounded-lg hover:bg-secondary"
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? "Logging out..." : "Yes, Logout"}
                            </button>
                            <button 
                                onClick={() => setShowLogoutModal(false)} 
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
