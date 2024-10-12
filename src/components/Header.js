import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { LOGO_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
    const { loggedInUser } = useContext(UserContext);
    const cartItems = useSelector((store) => store.cart.items);

    return (
        <header className="flex justify-between items-center p-4 shadow-lg bg-white relative">
            {/* Logo Section */}
            <div className="w-1/3 md:w-auto">
                <Link to="/">
                    <img className="w-24 md:w-32" src={LOGO_URL} alt="Logo" />
                </Link>
            </div>

            {/* Navigation Links - Aligning to the left */}
            <nav className="flex-grow hidden md:flex items-center space-x-6 ml-6">
                <ul className="flex items-center space-x-6">
                    {/* <li><Link to="/">Home</Link></li> */}
                    {/* <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li> */}
                </ul>
            </nav>

            {/* Hamburger Icon for mobile screens */}
            <div className="flex justify-end md:hidden w-1/3">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                        />
                    </svg>
                </button>
            </div>

            {/* Cart and Login/Logout Button */}
            <div className="flex items-center justify-end w-1/3 md:w-auto space-x-4">
                {/* Cart Section */}
                <Link to="/cart" className="relative">
                    <div className="relative flex justify-center items-center">
                        <div className="absolute -top-2 -right-2">
                            <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {cartItems.length}
                            </p>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                    </div>
                </Link>

                {/* Login/Logout Button */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => {
                        btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                    }}
                >
                    {btnName} {loggedInUser}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
                    <ul className="flex flex-col items-center py-4 space-y-4">
                        {/* <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li> */}
                        {/* <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
                        <li><Link to="/grocery" onClick={() => setIsMenuOpen(false)}>Grocery</Link></li> */}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
