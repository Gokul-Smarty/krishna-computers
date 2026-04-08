import { useState } from "react";
import axios from "axios";

const OrderForm = ({ product, onClose }) => {

  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const placeOrder = async () => {

  if (loading) return; // duplicate prevent

  setLoading(true);

  await axios.post("http://localhost:5000/api/orders", {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    customer_name: form.name,
    city: form.city,
    phone: form.phone,
  });

  alert("✅ Order Confirmed");

  onClose();

};

  return (

    /* Background Blur */
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

      {/* Modal */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Customer Details
        </h2>

        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="border p-3 w-full mb-3 rounded"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        />

        <button
  onClick={placeOrder}
  disabled={loading}
  className="bg-green-500 text-white px-4 py-2 rounded w-full"
>
  {loading ? "Placing Order..." : "Place Order"}
</button>

      </div>

    </div>

  );

};

export default OrderForm;