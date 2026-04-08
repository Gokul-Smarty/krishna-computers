import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();


    const showBackButton = location.state?.fromShop;



  useEffect(() => {
    axios
      .get("http://krishna-computers.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("API Error:", err);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10" id="Products">
    {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-200 px-4 py-2 rounded"
        >
          ← Back
        </button>
      )}
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map((product) => {
          const discount = Math.round(
            ((product.mrp - product.price) / product.mrp) * 100,
          );

          return (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
            
              {/* Product Image */}
              <div className="relative">
                <img
                  src={`http://krishna-computers.onrender.com/uploads/${product.thumbnail}`}
                  alt={product.name}
                  className="w-full h-36 object-cover"
                />

                {discount > 0 && (
                  <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h2 className="text-sm font-semibold truncate">
                  {product.name}
                </h2>

                <p className="text-gray-500 text-xs">{product.category}</p>

                {/* Price */}
                <div className="mt-1">
                  <p className="text-gray-400 line-through text-xs">
                    ₹{product.mrp}
                  </p>

                  <span className="text-blue-600 font-bold text-sm">
                    ₹{product.price}
                  </span>

                  {discount > 0 && (
                    <span className="text-green-600 text-xs ml-2">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="mt-2 w-full bg-blue-500 text-white text-xs py-1.5 rounded hover:bg-blue-600"
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
