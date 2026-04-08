import { FaHome, FaBox, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("admin");   // remove login

    navigate("/admin/login");           // redirect

  };
  return (
    <div className="h-[100vh] w-64 bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-8 text-blue-400">Admin Panel</h1>

      <ul className="space-y-4">
        <li>
          <Link to="/admin/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/ProductsList" className="hover:text-blue-400">
            Products
          </Link>
        </li>

        <li>
          <Link to="/admin/add-product" className="hover:text-blue-400">
            Add Product
          </Link>
        </li>

        <li>
          <Link to="/admin/orders" className="hover:text-blue-400">
            Orders
          </Link>
        </li>

        <li>
          <Link to="/admin/users" className="hover:text-blue-400">
            Users
          </Link>
        </li>
      </ul>
 {/* Logout Button */}
      <div className=" h-[54vh] flex flex-col items-center justify-end gap-3">
        <p className="h-1 w-full border-t border-gray-700"></p>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-[50%] bg-red-500 py-2 hover:bg-red-600 rounded"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
};

export default AdminSidebar;
