import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

const AdminDashboard = () => {

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {

    const fetchData = async () => {

      const products = await axios.get(
        "http://localhost:5000/api/products/count"
      );

      const orders = await axios.get(
        "http://localhost:5000/api/orders/count"
      );

      setTotalProducts(products.data.total);
      setTotalOrders(orders.data.total);

      const userRes = await axios.get(
      "http://localhost:5000/api/orders/users-count"
    );

    setTotalUsers(userRes.data.total);


    };

    fetchData();

  }, []);

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Products</h2>
          <p className="text-gray-600 mt-2">{totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Orders</h2>
          <p className="text-gray-600 mt-2">{totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-gray-600 mt-2">{totalUsers}</p>
        </div>

      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;