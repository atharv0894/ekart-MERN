import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const accesstoken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const cartCount = user?.cart?.length || 0;

  const handleAuthAction = async () => {
    if (user) {
      try {
        const res = await axios.post(
          "https://ekart-mern-backend.onrender.com/api/v1/user/logout",
          {},
          { headers: { Authorization: `Bearer ${accesstoken}` } }
        );
        if (res.data.success) {
          dispatch(setUser(null));
          toast.success(res.data.message);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");

        }
      } catch (error) {
        console.log(error);
        toast.error("Logout failed. Please try again.");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-gray-600 fixed w-full z-20 border-b border-gray-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <img src="/Ekart.png" alt="logo" className="w-[100px]" />

        {/* Nav */}
        <nav className="flex gap-8 items-center">
          <ul className="flex gap-6 items-center text-lg font-semibold text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              {user ? (
                <Link to={`/profile/${user.id}`}>Hello, {user.firstName}</Link>
              ) : null}
            </li>
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative text-white">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full absolute -top-2 -right-3 px-2">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login/Logout Button */}
          <Button
            onClick={handleAuthAction}
            className={
              user
                ? "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                : "bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
            }
          >
            {user ? "Logout" : "Login"}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;