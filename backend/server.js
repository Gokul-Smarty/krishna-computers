const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);

// app.use("/api/products", require("./routes/products"));

app.use("/api/admin", adminRoutes);

//admin data store in db
app.get("/", (req, res) => {
  res.send("Krishna Computers Backend Running 🚀");
});

//userorder
app.use("/api/orders", orderRoutes);


app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});

