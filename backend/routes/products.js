const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");

const upload = multer({ dest: "uploads/" });

/* ADD PRODUCT */
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images" }
  ]),
  (req, res) => {

    const { name, description, mrp, price, category, type } = req.body;

    // ✅ Fix here
    const thumbnail = req.files?.thumbnail
      ? req.files.thumbnail[0].filename
      : null;

    const sql =
      "INSERT INTO products (name,description,mrp,price,category,type,thumbnail) VALUES (?,?,?,?,?,?,?)";

    db.query(
      sql,
      [name, description, mrp, price, category, type, thumbnail],
      (err, result) => {

        if (err) {
          console.log(err);
          return res.status(500).send("Database error");
        }

        const productId = result.insertId;

        if (req.files.images) {
          req.files.images.forEach((img) => {
            db.query(
              "INSERT INTO product_images (product_id,image_url) VALUES (?,?)",
              [productId, img.filename]
            );
          });
        }

        res.send("Product Added Successfully");
      }
    );
  }
);

/* GET PRODUCTS */
router.get("/", (req, res) => {

  const sql = "SELECT * FROM products ORDER BY id ASC";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send("Database Error");
    }

    res.json(result);

  });

});


// UPDATE product
// UPDATE product
router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images" }
  ]),
  (req, res) => {

    const id = req.params.id;

    const { name, category, mrp, price } = req.body;

    // existing thumbnail
    let thumbnail = req.body.thumbnail;

    // if new thumbnail uploaded
    if (req.files?.thumbnail) {
      thumbnail = req.files.thumbnail[0].filename;
    }

    const sql = `
      UPDATE products 
      SET name=?, category=?, mrp=?, price=?, thumbnail=?
      WHERE id=?
    `;

    db.query(sql, [name, category, mrp, price, thumbnail, id], (err, result) => {

      if (err) {
        console.log("DB Error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // save similar images
      if (req.files?.images) {

        req.files.images.forEach((img) => {

          db.query(
            "INSERT INTO product_images (product_id,image_url) VALUES (?,?)",
            [id, img.filename]
          );

        });

      }

      res.json({ message: "Product updated successfully" });

    });

  }
);



// DELETE product
router.delete("/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "Product Deleted" });
    }

  });

});


// total products count
router.get("/count", (req, res) => {

  const sql = "SELECT COUNT(*) AS total FROM products";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      total: result[0].total
    });

  });

});


//product details
// product details with similar images
router.get("/:id", (req, res) => {

  const id = req.params.id;

  const productSql = "SELECT * FROM products WHERE id=?";

  db.query(productSql, [id], (err, productResult) => {

    if (err) return res.status(500).json(err);

    if (productResult.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = productResult[0];

    const imagesSql =
      "SELECT image_url FROM product_images WHERE product_id=?";

    db.query(imagesSql, [id], (err, imagesResult) => {

      if (err) return res.status(500).json(err);

      const images = imagesResult.map((img) => img.image_url);

      res.json({
        ...product,
        images: images
      });

    });

  });

});

module.exports = router;