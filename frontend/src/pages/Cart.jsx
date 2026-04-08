import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEye, FaArrowLeft } from "react-icons/fa";

const Cart = () => {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  /* DELETE ITEM */
  const removeItem = (index) => {

    const updated = [...cart];
    updated.splice(index, 1);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

  };

  /* QUANTITY CHANGE */
  const changeQty = (index, type) => {

    const updated = [...cart];

    if (type === "inc") {
      updated[index].qty += 1;
    } else {
      if (updated[index].qty > 1) {
        updated[index].qty -= 1;
      }
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
      >
        <FaArrowLeft />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart 🛒</h1>

      {cart.length === 0 && (
        <p className="text-gray-500">Cart is empty</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {cart.map((item, index) => (

          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
          >

            <img
              src={`http://krishna-computers.onrender.com/uploads/${item.thumbnail}`}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="font-semibold mt-3">
              {item.name}
            </h2>

            <p className="text-blue-600 font-bold">
              ₹{item.price}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-3">

              <button
                onClick={() => changeQty(index,"dec")}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => changeQty(index,"inc")}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>

            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => navigate(`/product/${item.id}`)}
                className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                <FaEye /> View
              </button>

              <button
                onClick={() => removeItem(index)}
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                <FaTrash /> Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );

};

export default Cart;