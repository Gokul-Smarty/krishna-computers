import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/file.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.length;

    setCartCount(total);
  }, []);

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Krishna Computers"
              className="h-10 w-auto object-contain"
            />

            <h1 className="text-lg font-bold text-blue-400 hidden sm:block">
              Krishna Computers
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-72 ml-6">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-1 w-full text-black outline-none"
            />
            <button className="bg-blue-500 p-1">🔍</button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-medium ml-6">
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-blue-400 cursor-pointer"><a href="#Products">Products</a></li>
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/aboutshort">About</Link></li>
            <li className="hover:text-blue-400 cursor-pointer"><a href="#footer">Contact</a></li>
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-5 ml-6">
            <div className="relative cursor-pointer">
              <button onClick={() => navigate("/cart")} className="relative">
                🛒
              </button>
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                <span>{cartCount || 0}</span>
              </span>
            </div>

            <FaUser className="text-lg cursor-pointer" />

            {/* Mobile Menu Button */}
            <div
              className="md:hidden text-2xl cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? <HiX /> : <HiMenu />}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="flex bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-2 w-full text-black outline-none"
            />
            <button className="bg-blue-500 px-4">🔍</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-700">
          <ul className="flex flex-col items-center gap-6 py-6">
            <li className="hover:text-blue-400">Home</li>
            <li className="hover:text-blue-400">Products</li>
            <li className="hover:text-blue-400">Services</li>
            <li className="hover:text-blue-400">About</li>
            <li className="hover:text-blue-400">Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
