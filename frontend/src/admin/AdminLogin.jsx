import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {

  e.preventDefault();   // ✅ stop page refresh

  try {

    const res = await axios.post(
      "http://localhost:5000/api/admin/login",
      { email, password }
    );

    if (res.data.success) {

      localStorage.setItem("admin", "true");

      navigate("/admin/dashboard");

    } else {

      alert("Invalid Login");

    }

  } catch (error) {

    console.log(error);

  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full py-2 rounded">
          Login
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;