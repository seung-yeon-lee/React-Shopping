const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());
// 배포
// app.use('/', express.static(__dirname + "/build"));
// app.get('/', (req,res) => res.sendFile(__dirname +'/build/index.html'))

mongoose.connect("mongodb://localhost/shopdb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    size: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const saveProduct = await newProduct.save();
  res.send(saveProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req, params.id);
  res.send(deletedProduct);
});
// ---------------- Order 설정 ------------------
const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: { type: String, default: shortid.generate },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  const { email, name, address, total, cartItems } = req.body;
  if (!name || !email || !address || !total || !cartItems) {
    return res.send({ message: "필수 항목이 누락되었습니다." });
  }
  const order = await Order(req.body).save();
  console.log(order);
  res.send(order);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("서버 실행 중"));
