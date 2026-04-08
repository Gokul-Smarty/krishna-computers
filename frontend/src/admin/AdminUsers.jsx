import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AdminUsers = () => {
    const navigate = useNavigate()
  const [users, setUsers] = useState([]);

  useEffect(() => {

    axios
      .get("http://krishna-computers.onrender.com/api/orders/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <AdminLayout>
 {/* Back Button */}
          <button
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Customers
        </h1>

        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg">
          Total Users : {users.length}
        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-700">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">City</th>
            </tr>

          </thead>

          <tbody>

            {users.map((u, i) => (

              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium">
                  {i + 1}
                </td>

                <td className="p-4">
                  {u.customer_name}
                </td>

                <td className="p-4 text-gray-600">
                  {u.phone}
                </td>

                <td className="p-4 text-gray-600">
                  {u.city}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">

        {users.map((u, i) => (

          <div
            key={i}
            className="bg-white shadow rounded-lg p-4"
          >

            <p className="font-semibold text-gray-800">
              ID : {i + 1}
            </p>

            <p className="mt-1">
              Name : {u.customer_name}
            </p>

            <p className="text-gray-600">
              Phone : {u.phone}
            </p>

            <p className="text-gray-600">
              City : {u.city}
            </p>

          </div>

        ))}

      </div>

    </AdminLayout>
  );
};

export default AdminUsers;