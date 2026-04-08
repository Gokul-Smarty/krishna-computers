import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const location = useLocation();

  useEffect(() => {
  setSidebarOpen(false);
}, [location]);

  return (

<div className="flex-1 flex flex-col md:ml-64 bg-gray-200 h-[100vh]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:fixed top-0 left-0 h-screen w-64 bg-blue-900/80 shadow z-50
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300
        flex flex-col text-white
        `}
      >

        {/* Sidebar Header */}
        <div className="py-3 border-b text-center font-bold text-xl text-white/50 bg-blue-900">
          Admin Panel
        </div>

        {/* Menu */}
        <nav className="flex flex-col flex-1 p-3 gap-5">

          <Link
            to="/admin/dashboard"
            onClick={closeSidebar}
            className="px-4 py-2 rounded hover:bg-gray-900/20"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/add-product"
            onClick={closeSidebar}
            className="px-4 py-2 rounded hover:bg-gray-900/20"
          >
            Add Product
          </Link>

          <Link
            to="/admin/products"
            onClick={closeSidebar}
            className="px-4 py-2 rounded hover:bg-gray-900/20"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            onClick={closeSidebar}
            className="px-4 py-2 rounded hover:bg-gray-900/20"
          >
            Orders
          </Link>

          <Link
            to="/admin/users"
            onClick={closeSidebar}
            className="px-4 py-2 rounded hover:bg-gray-900/20"
          >
            Users
          </Link>

        </nav>

        {/* Logout Button */}
        <div className="py-4 px-10 border-t">

          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Logout
          </button>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="ml-1 shadow px-4 py-3 flex items-center bg-blue-900">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="font-semibold text-xl text-white">
            Welcome Krishna!
          </h1>

        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>

      </div>

    </div>

  );

};

export default AdminLayout;