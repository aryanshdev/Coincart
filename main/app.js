const express = require("express");
const pg = require("pg-promise")();
const parser = require("body-parser");
const app = express();

app.use(parser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const connectionURL =
  "postgresql://retool:69xhVYmQuste@ep-morning-cherry-23207962.us-west-2.retooldb.com/retool?sslmode=require";
const database = pg(connectionURL);

let item_in_cart = 0;
let username = null;
app.use(express.static(__dirname + "/public"));
app.listen(3001);

app.get("/", (req, res) => {
  app.locals.item_in_cart = item_in_cart;
  res.render(__dirname + "/index.ejs", {
    title: "CoinCart | Crypto Based Marketplace",
  });
});

app.get("/login", (req, res) => {
  app.locals.item_in_cart = item_in_cart;
  res.render(__dirname + "/login.ejs", { title: "Login | CoinCart" });
});

app.get("/register", (req, res) => {
  app.locals.item_in_cart = item_in_cart;
  res.render(__dirname + "/register.ejs", { title: "Register | CoinCart" });
});

app.get("/product-:id", (req, res) => {
  app.locals.item_in_cart = item_in_cart;
  res.render(__dirname + "/ejs/product.ejs", { title: req.params["id"] });
});

app.get("/cart", (req, res) => {
  var cartProducts = [];
  database
  .query("SELECT cart FROM users WHERE username = '" + username + "';")
  .then((result) => {
    const cartProductsCode = result[0].cart.slice(0, -1).split(";");
    const promises = [];

    cartProductsCode.forEach((code) => {
      code = code.split(",");
      const productQuery = database.query("SELECT * FROM products WHERE id = " + code[0] + ";")
        .then((productResult) => {
          const product = productResult[0];
          product.quantity = parseInt(code[1]);
          return product;
        });

      promises.push(productQuery);
    });

    return Promise.all(promises)
      .then((cartProducts) => {
        res.render(__dirname + "/cart.ejs", {
          title: "Cart",
          productsInCart: cartProducts,
        });
      });
  })
  .catch((error) => {
    res.send(error);
  });


});

app.post("/login", (req, res) => {
  database
    .query("SELECT * FROM users WHERE username = '" + req.body.username + "';")
    .then((result) => {
      if (result[0].password == req.body.password) {
        username = req.body.username;
        app.locals.item_in_cart = result[0].cart.slice(0, -1).split(";").length;
        item_in_cart = app.locals.item_in_cart;
        res.redirect("/");
      }
    })
    .catch((error) => {
      res.send(error);
    });
});
