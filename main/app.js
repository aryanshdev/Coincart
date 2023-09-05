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
let fullname = null;
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
if(username != null){

  //User Logged-In
  var cartProducts = [];
  database
  .query("SELECT cart FROM users WHERE username = '" + username + "';")
  .then((result) => {
    if(result[0].cart !== null ){
      
  //User Logged-In, Cart Not Empty
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
          name : fullname
        });
      });
}
else{ 
  //User Logged-In, Cart Empty
  res.render(__dirname + "/cart.ejs", {
    title: "Cart",
    productsInCart: [],
    name : fullname
  });
}
})
  .catch((error) => {
    res.send(error);
  });
}
else{
  //User Not Logged-In
  res.render(__dirname + "/cart.ejs", {
    title: "Cart",
    productsInCart: [],
    name : ""
  });
}
});

app.get("/success", (req,res)=>{
  res.render(__dirname + "/ejs/success-info.ejs", {title: "Success", message:"<h4> Click Here To Conitnue To Login </h4>"} )
})

app.post("/login", (req, res) => {
  database
    .query("SELECT * FROM users WHERE username = '" + req.body.username + "';")
    .then((result) => {
      if (result[0].password == req.body.password) {
        username = req.body.username;
        fullname = result[0].name;
        if(result[0].cart !== null){
          app.locals.item_in_cart = result[0].cart.slice(0, -1).split(";").length;
        item_in_cart = app.locals.item_in_cart;
        }
        res.redirect("/");
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/contact", (req,res) =>{
  res.render(__dirname +"/contact.ejs" , {title:"Contact | CoinCart"})
});

app.post("/register", (req,res) =>{
  if((req.body.password == req.body.password_con) && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(req.body.email)){
    database
    .query("INSERT INTO users (username,name,password,cart) VALUES ('"+req.body.email+"','"+req.body.name+"','"+req.body.password +"',null);")
    .then((result) => {
      res.render(__dirname + "/ejs/success-info.ejs", {title: "Registeration Success", pageTitle:"Account Regisstration Successful", message:"<br><br><h5><a style='color:#ff7f00 'href='/login'> Click Here To Conitnue To Login </a> </h5>"} )
      })
    .catch((error) => {
      res.send(error);
    });
  }
  else{
    res.sendStatus(400);
  }
});