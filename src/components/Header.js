import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { LOGO_URL } from "../utils/constants";

const Header = () => {

    const [btnName, setBtnName] = useState("Login");
    const { loggedInUser, setName } = useContext(UserContext)

    return (
        <div className="flex justify-between shadow-lg">
            <div className="px-10">
                <img className="w-36" src={LOGO_URL} />
            </div>
            <div className="flex items-center px-10">
                <ul className="flex">
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link></li>
                    <li className="px-4"><Link to="/cart">Cart</Link></li>
                    <button className="px-4" onClick={() => {
                        btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                    }}>{btnName + " " + loggedInUser}</button>
                </ul>

            </div>
        </div>
    )
}

export default Header;