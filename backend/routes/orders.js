const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* CREATE ORDER */
router.post("/", (req, res) => {

  const { product_id, product_name, price, customer_name, city, phone } = req.body;

  const sql = `
  INSERT INTO orders 
  (product_id,product_name,price,customer_name,city,phone)
  VALUES (?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [product_id, product_name, price, customer_name, city, phone],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send("DB Error");
      }

      res.json({ message: "Order placed successfully" });

    }
  );
});

/* ADMIN GET ORDERS */
router.get("/", (req, res) => {

  db.query("SELECT * FROM orders ORDER BY id ASC",(err,result)=>{

    if(err) return res.status(500).json(err);

    res.json(result);

  });

});

/* UPDATE STATUS */
router.put("/:id",(req,res)=>{

  const {status} = req.body;

  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [status,req.params.id],
    (err,result)=>{

      if(err) return res.status(500).json(err);

      res.json({message:"Order Updated"});

    }
  );

});

//admin orderpage
router.get("/count", (req, res) => {

  const sql = "SELECT COUNT(*) AS total FROM orders";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      total: result[0].total
    });

  });

});

//user count
router.get("/users-count", (req, res) => {

  const sql = "SELECT COUNT(DISTINCT phone) AS total FROM orders";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({ total: result[0].total });

  });

});

//admin userpage
router.get("/users", (req, res) => {

  const sql = "SELECT DISTINCT customer_name, phone, city FROM orders";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

});

router.post("/", (req, res) => {

  const { product_name, customer_name, city, phone } = req.body;

  const sql = `
  INSERT INTO orders
  (product_name, customer_name, city, phone, status)
  VALUES (?, ?, ?, ?, 'Pending')
  `;

  db.query(sql,
    [product_name, customer_name, city, phone],
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json({ message: "Order placed successfully" });

  });

});

router.put("/:id/confirm", (req, res) => {

  const id = req.params.id;

  const sql = `
  UPDATE orders 
  SET status='Confirmed',
      confirmed_at=NOW()
  WHERE id=?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({ message: "Order Confirmed" });

  });

});
router.put("/:id/cancel", (req, res) => {

  const id = req.params.id;

  const sql = `
  UPDATE orders 
  SET status='Cancelled',
      cancelled_at=NOW()
  WHERE id=?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({ message: "Order Cancelled" });

  });

});

// GET ORDER STATUS BY PRODUCT
router.get("/status/:productId", (req, res) => {

  const productId = req.params.productId;

  const sql = `
  SELECT status, created_at, confirmed_at, cancelled_at
  FROM orders
  WHERE product_id = ?
  ORDER BY id DESC
  LIMIT 1
  `;

  db.query(sql, [productId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.json(null);
    }

    res.json(result[0]);

  });

});

module.exports = router;