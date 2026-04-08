import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import Products from "./pages/Products";
import ProductsList from "./admin/ProductsList";
import Footer from "./components/Footer";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AboutShort from "./pages/AboutShort";
// import Services from "./components/Services";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              {/* <Services /> */}
              <Hero />
              <Products />
              <Footer />
            </>
          }
        />

        <Route path="/footer" element={<Footer />} />
        <Route path="/products" element={<Products />} />
        <Route path="/aboutshort" element={<AboutShort />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/orders" element={<AdminOrders  />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        {/* Admin Dashboard */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
  path="/admin/dashboard"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminProtectedRoute>
      <ProductsList />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/add-product"
  element={
    <AdminProtectedRoute>
      <AddProduct />
    </AdminProtectedRoute>
  }
/>
        <Route path="/admin/productslist" element={<ProductsList />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;