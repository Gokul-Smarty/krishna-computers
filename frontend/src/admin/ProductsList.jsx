import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://krishna-computers.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // delete product
 const deleteProduct = async (id) => {

  try {

    await axios.delete(`http://krishna-computers.onrender.com/api/products/${id}`);

    setProducts(products.filter((p) => p.id !== id));

  } catch (error) {
    console.log(error);
  }

};

// update product
const updateProduct = async () => {
  try {

    const formData = new FormData();

    formData.append("name", editProduct.name);
    formData.append("category", editProduct.category);
    formData.append("mrp", editProduct.mrp);
    formData.append("price", editProduct.price);
    formData.append("thumbnail", editProduct.thumbnail);

    for (let i = 0; i < similarImages.length; i++) {
      formData.append("images", similarImages[i]);
    }

    await axios.put(
      `http://krishna-computers.onrender.com/api/products/${editProduct.id}`,
      formData
    );

    const updatedList = products.map((p) =>
      p.id === editProduct.id ? editProduct : p
    );

    setProducts(updatedList);
    setEditProduct(null);

    alert("Product updated successfully!");

  } catch (error) {
    console.log(error);
    alert("Failed to update product");
  }
};
  const navigate = useNavigate();



return (  
  <div className="p-4 md:p-8">

    {/* Back Button */}
    <button
      onClick={() => navigate("/admin/dashboard")}
      className="flex items-center gap-2 mb-4 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm"
    >
      <FaArrowLeft /> Back to Dashboard
    </button>

    <h1 className="text-xl md:text-3xl font-bold mb-6">
      Admin Products
    </h1>

{editProduct && (
<div className="mb-6 bg-gray-100 p-4 rounded flex flex-col gap-3">

<input
type="text"
value={editProduct.name || ""}
onChange={(e)=>setEditProduct({...editProduct,name:e.target.value})}
className="border p-2 rounded w-full"
/>

<input
type="text"
value={editProduct.category || ""}
onChange={(e)=>setEditProduct({...editProduct,category:e.target.value})}
className="border p-2 rounded w-full"
/>

<input
type="number"
value={editProduct.mrp || ""}
onChange={(e)=>setEditProduct({...editProduct,mrp:e.target.value})}
className="border p-2 rounded w-full"
/>

<input
type="number"
value={editProduct.price || ""}
onChange={(e)=>setEditProduct({...editProduct,price:e.target.value})}
className="border p-2 rounded w-full"
/>

<input
type="text"
value={editProduct.thumbnail || ""}
onChange={(e)=>setEditProduct({...editProduct,thumbnail:e.target.value})}
className="border p-2 rounded w-full"
/>

<label className="font-semibold mt-2">
Add Similar Images
</label>

<input
type="file"
multiple
onChange={(e) => setSimilarImages(e.target.files)}
className="border p-2 rounded w-full"
/>

<div className="flex gap-2 flex-wrap">
<button onClick={updateProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
Save
</button>

<button onClick={()=>setEditProduct(null)} className="bg-gray-400 text-white px-4 py-2 rounded">
Cancel
</button>
</div>

</div>
)}

<div className="bg-white shadow-lg rounded-lg overflow-x-auto">

<table className="min-w-[700px] w-full text-left text-sm md:text-base">

<thead className="bg-gray-100">
<tr>

<th className="p-2 md:p-4">ID</th>
<th className="p-2 md:p-4">Image</th>
<th className="p-2 md:p-4">Name</th>
<th className="p-2 md:p-4">Category</th>
<th className="p-2 md:p-4">MRP</th>
<th className="p-2 md:p-4">Price</th>
<th className="p-2 md:p-4">Discount</th>
<th className="p-2 md:p-4">Actions</th>

</tr>
</thead>

<tbody>

{products.map((product) => {

const discount = Math.round(
((product.mrp - product.price) / product.mrp) * 100,
);

return (

<tr key={product.id} className="border-t hover:bg-gray-50">

<td className="p-2 md:p-4 font-bold">{product.id}</td>

<td className="p-2 md:p-4">
<img
src={`http://krishna-computers.onrender.com/uploads/${product.thumbnail}`}
className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
/>
</td>

<td className="p-2 md:p-4 font-semibold">
{product.name}
</td>

<td className="p-2 md:p-4">
{product.category}
</td>

<td className="p-2 md:p-4 line-through text-gray-400">
₹{product.mrp}
</td>

<td className="p-2 md:p-4 text-blue-600 font-bold">
₹{product.price}
</td>

<td className="p-2 md:p-4 text-green-600">
{discount}% OFF
</td>

<td className="p-2 md:p-4 flex gap-2 flex-wrap">

<button
onClick={()=>setEditProduct(product)}
className="bg-yellow-400 px-3 py-1 rounded text-sm"
>
Edit
</button>

<button
onClick={()=>deleteProduct(product.id)}
className="bg-red-500 text-white px-3 py-1 rounded text-sm"
>
Delete
</button>

</td>

</tr>

);

})}

</tbody>

</table>

</div>

</div>
);
};

export default ProductsList;
