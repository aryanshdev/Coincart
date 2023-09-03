const express = require("express");
const https = require("https");
const app = express();

app.set("view engine", "ejs");
let item_in_cart = 0;

app.use(express.static(__dirname + "/public"));
app.listen(3001);

app.get("/", (req, res) => {
    app.locals.item_in_cart = item_in_cart;
  res.render(__dirname + "/index.ejs", {
    title: "CoinCart | Crypto Based Marketplace",
  });
});

app.get("/login", (req, res) => {
  res.render(__dirname + "/login.ejs", { title: "Login | CoinCart" });
});

app.get("/register", (req, res) => {
  res.render(__dirname + "/register.ejs", { title: "Register | CoinCart" });
});

app.get("/product-:id", (req, res) => {
  res.render(__dirname + "/ejs/product.ejs", { title: req.params["id"] });
});

app.get("/cart", (req, res) => {
  res.render(__dirname + "/cart.ejs", { title: "Cart" });
});
