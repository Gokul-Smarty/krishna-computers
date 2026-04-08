import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {

    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data));

  }, []);

 const confirmOrder = async (id) => {

  await axios.put(
    `http://localhost:5000/api/orders/${id}/confirm`
  );

  setOrders((prev) =>
    prev.map((o) =>
      o.id === id ? { ...o, status: "Confirmed" } : o
    )
  );

};


const cancelOrder = async (id) => {

  await axios.put(
    `http://localhost:5000/api/orders/${id}/cancel`
  );

  setOrders((prev) =>
    prev.map((o) =>
      o.id === id ? { ...o, status: "Cancelled" } : o
    )
  );

};

  return (

    <AdminLayout>
     {/* Back Button */}
          <button
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Product</th>
            <th className="p-3">Customer</th>
            <th className="p-3">City</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id} className="border-t">

              <td className="p-3">#{order.id}</td>
              <td className="p-3">{order.product_name}</td>
              <td className="p-3">{order.customer_name}</td>
              <td className="p-3">{order.city}</td>
              <td className="p-3">{order.phone}</td>
              <td className="p-3">{order.status}</td>

              <td className="p-3">

{order.status === "Pending" && (

<button
onClick={() => confirmOrder(order.id)}
className="bg-green-500 text-white px-3 py-1 rounded"
>
Confirm
</button>

)}

{order.status === "Confirmed" && (

<button
onClick={() => cancelOrder(order.id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Cancel
</button>

)}

{order.status === "Cancelled" && (

<span className="text-red-500 font-semibold">
Cancelled
</span>

)}

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </AdminLayout>

  );

};

export default AdminOrders;