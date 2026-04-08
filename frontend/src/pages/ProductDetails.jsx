import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import OrderForm from "./OrderForm";

const ProductDetails = () => {
const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);

        setMainImage(res.data.thumbnail);

        if (res.data.images) {
          setImages(res.data.images);
        }
      })
      .catch((err) => console.log(err));  
      axios
.get(`http://localhost:5000/api/orders/status/${id}`)
.then((res) => {
  setOrderStatus(res.data);
})
.catch((err) => console.log(err));
  }, [id]);

  /* ADD TO CART */
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart 🛒");
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images Section */}
        <div>
          <img
            src={`http://localhost:5000/uploads/${mainImage}`}
            className="w-full h-96 object-cover rounded-lg shadow p-2"
          />
          {/* Thumbnail Images */}
          <div className="mt-4">

  <h1 className="mb-3 font-semibold">Similar Images:</h1>

  <div className="flex gap-3 flex-wrap">

    <img
      src={`http://localhost:5000/uploads/${product.thumbnail}`}
      onClick={() => setMainImage(product.thumbnail)}
      className="w-20 h-20 object-cover border rounded cursor-pointer 
hover:scale-110 hover:shadow-lg transition duration-300"
    />

    {images.map((img, i) => (
      <img
        key={i}
        src={`http://localhost:5000/uploads/${img}`}
        onClick={() => setMainImage(img)}
        className="w-20 h-20 object-cover border rounded cursor-pointer 
hover:scale-110 hover:shadow-lg transition duration-300"
      />
    ))}

  </div>

</div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-gray-500 mb-4">{product.category}</p>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-blue-600">
              ₹{product.price}
            </span>

            <span className="text-gray-400 line-through">₹{product.mrp}</span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

        {/* ORDER STATUS */}
{orderStatus && (

<div className="mb-6">

<p className="text-gray-500 mb-2 font-medium">
Order Status
</p>

<div className="flex items-center gap-3 flex-wrap">

{orderStatus.status === "Pending" && (
<span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
🕒 Pending
</span>
)}

{orderStatus.status === "Confirmed" && (
<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
✅ Confirmed
</span>
)}

{orderStatus.status === "Cancelled" && (
<span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
❌ Cancelled
</span>
)}

</div>

</div>

)}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Order Now
            </button>
{showForm && (
  <OrderForm
    product={product}
    onClose={() => setShowForm(false)}
  />
)}          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
