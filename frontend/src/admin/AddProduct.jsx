import { useState, useRef } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

const [imageInputs, setImageInputs] = useState([0]);
const addImageInput = () => {
  setImageInputs([...imageInputs, imageInputs.length]);
};
  
  const formRef = useRef(); // form reference

  const [product, setProduct] = useState({
    name: "",
    description: "",
    mrp: "",
    price: "",
    category: "",
    type: ""
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("mrp", product.mrp);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("type", product.type);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await axios.post("http://krishna-computers.onrender.com/api/products", formData);

      alert("Product Added Successfully ✅");

      // reset product state
      setProduct({
        name: "",
        description: "",
        mrp: "",
        price: "",
        category: "",
        type: "sales"
      });

      setThumbnail(null);
      setImages([]);

      // reset entire form including file inputs
      formRef.current.reset();

    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

    const navigate = useNavigate();
  
  return (
    <AdminLayout>

      <div className="h-full">
 {/* Back Button */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
        <h1 className="text-2xl text-center md:text-3xl mb-4 font-bold">
          Add Product
        </h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow rounded max-w-2xl mx-auto w-full"
        >

          {/* Product Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="number"
              name="mrp"
              placeholder="MRP Price"
              value={product.mrp}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              name="price"
              placeholder="Selling Price"
              value={product.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

          </div>

          {/* Category */}
          <select
  name="category"
  value={product.category}
  onChange={handleChange}
  className="w-full border p-2 mt-4 rounded"
>
  <option value="" disabled>Select Product</option>
  <option value="laptop">Laptop</option>
  <option value="mobile">Mobile</option>
  <option value="accessories">Accessories</option>
  <option value="repair">Repair</option>
</select>

          {/* Product Type */}
         <select
  name="type"
  value={product.type}
  onChange={handleChange}
  className="w-full border p-2 mt-4 rounded"
>
  <option value="" disabled>Products</option>
  <option value="sales">Sales</option>
  <option value="service">Service</option>
</select>
          {/* Thumbnail */}
          <label className="block mt-4 font-semibold">
            Thumbnail Image
          </label>

          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full border p-2 mt-2 rounded"
          />

          {/* Related Images */}
         <label className="block mt-4 font-semibold">
Similar Images
</label>

{imageInputs.map((input, index) => (

<input
key={index}
type="file"
onChange={(e) => {
const newImages = [...images];
newImages[index] = e.target.files[0];
setImages(newImages);
}}
className="w-full border p-2 mt-2 rounded"
/>

))}

<button
type="button"
onClick={addImageInput}
className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
>
+ Add More Images
</button>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mt-6"
          >
            Add Product
          </button>

        </form>

      </div>

    </AdminLayout>
  );
};

export default AddProduct;