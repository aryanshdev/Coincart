const express = require("express");
const pg = require("pg-promise")();
const parser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

app.use(parser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// COIN API URL : ADD  BACK WHEN COMMITING

// https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol

// URL END

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
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      res.render(__dirname + "/index.ejs", {
        title: "CoinCart | Crypto Based Marketplace",
        btcPrice: priceValues[1],
        ethPrice: priceValues[2],
        ltcPrice: priceValues[3],
        bnbPrice: priceValues[0],
        solPrice: priceValues[4],
      });
    });
});

app.get("/login-?:redirect?", (req, res) => {
  app.locals.item_in_cart = item_in_cart;
  var priceValues = [];
  fetch("", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      if (!username) {
        res.render(__dirname + "/login.ejs", {
          title: "Login | CoinCart",
          redirect: req.params.redirect || undefined,
          btcPrice: priceValues[1],
          ethPrice: priceValues[2],
          ltcPrice: priceValues[3],
          bnbPrice: priceValues[0],
          solPrice: priceValues[4],
        });
      } else {
        res.redirect("/account");
      }
    });
});

app.get("/account", (req, res) => {
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      res.render(__dirname + "/account.ejs", {
        title: "Your Account | CoinCart",
        btcPrice: priceValues[1],
        ethPrice: priceValues[2],
        ltcPrice: priceValues[3],
        bnbPrice: priceValues[0],
        solPrice: priceValues[4],
      });
    });
});

app.get("/register", (req, res) => {
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      app.locals.item_in_cart = item_in_cart;
      res.render(__dirname + "/register.ejs", {
        title: "Register | CoinCart",
        btcPrice: priceValues[1],
        ethPrice: priceValues[2],
        ltcPrice: priceValues[3],
        bnbPrice: priceValues[0],
        solPrice: priceValues[4],
      });
    });
});

app.get("/product-:id", (req, res) => {
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      app.locals.item_in_cart = item_in_cart;
      database
        .query("SELECT * FROM products LEFT JOIN reviews ON products.id = reviews.id WHERE products.id = " + req.params["id"] + ";")
        .then((result) => {
          result = result[0];
          res.render(__dirname + "/ejs/product.ejs", {
            title: result.product_name,
            productName: result.product_name,
            productImage: result.product_img,
            category: result.product_category,
            productPrice: result.product_price,
            code: result.id,
            username : username,
            reviews: result.reviews ,
            totalReviews : result.reviews_made,
            description: result.product_description,
            productDetails: result.details_tbl,
            btcPrice: priceValues[1],
            ethPrice: priceValues[2],
            ltcPrice: priceValues[3],
            bnbPrice: priceValues[0],
            solPrice: priceValues[4],
          });
        })
        .catch((error) => {
          if (error.errno === -4039) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Connectivity Issue | CoinCart",
              pageTitle: "There was a connection issue, please try again later",
              message:
                "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
            });
          } else if (error instanceof TypeError) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "404 : Product Not Found",
              pageTitle: "Product Not Found",
              message:
                "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
            });
          }
        });
    });
});

app.get("/cart", (req, res) => {
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      if (username != null) {
        //User Logged-In
        var cartProducts = [];
        database
          .query("SELECT cart FROM users WHERE username = '" + username + "';")
          .then((result) => {
            if (result[0].cart !== null) {
              //User Logged-In, Cart Not Empty
              const cartProductsCode = result[0].cart.slice(0, -1).split(";");
              const promises = [];

              cartProductsCode.forEach((code) => {
                code = code.split(",");
                const productQuery = database
                  .query("SELECT * FROM products WHERE id = " + code[0] + ";")
                  .then((productResult) => {
                    const product = productResult[0];
                    product.quantity = parseInt(code[1]);
                    return product;
                  });

                promises.push(productQuery);
              });

              return Promise.all(promises).then((cartProducts) => {
                res.render(__dirname + "/cart.ejs", {
                  title: "Cart",
                  productsInCart: cartProducts,
                  name: fullname,
                  btcPrice: priceValues[1],
                  ethPrice: priceValues[2],
                  ltcPrice: priceValues[3],
                  bnbPrice: priceValues[0],
                  solPrice: priceValues[4],
                });
              });
            } else {
              //User Logged-In, Cart Empty
              res.render(__dirname + "/cart.ejs", {
                title: "Cart",
                productsInCart: [],
                name: fullname,
                btcPrice: priceValues[1],
                ethPrice: priceValues[2],
                ltcPrice: priceValues[3],
                bnbPrice: priceValues[0],
                solPrice: priceValues[4],
              });
            }
          })
          .catch((error) => {
            res.send(error);
          });
      } else {
        //User Not Logged-In
        res.render(__dirname + "/cart.ejs", {
          title: "Cart",
          productsInCart: [],
          name: "",
          btcPrice: priceValues[1],
          ethPrice: priceValues[2],
          ltcPrice: priceValues[3],
          bnbPrice: priceValues[0],
          solPrice: priceValues[4],
        });
      }
    });
});

app.post("/login", (req, res) => {
  database
    .query("SELECT * FROM users WHERE username = '" + req.body.username + "';")
    .then((result) => {
      if (result[0].password == req.body.password) {
        username = req.body.username;
        fullname = result[0].name;
        if (result[0].cart !== null) {
          app.locals.item_in_cart = item_in_cart = result[0].cart
            .slice(0, -1)
            .split(";").length;
        }

        if (req.body.redirect !== "undefined") {
          res.redirect("/" + req.body.redirect);
        } else {
          res.redirect("/");
        }
      }
    })
    .catch((error) => {
      if (error.errno === -3008) {
        res.render(__dirname + "/ejs/info-pg.ejs", {
          title: "Connectivity Issue | CoinCart",
          pageTitle: "Unable to Connect To Database Server",
          message:
            "<br><h4>Either The Server is Down or You Have Connectivity Issues. Try Again Later</h4><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
        });
      }
      if (error.errno === -4039) {
        res.render(__dirname + "/ejs/info-pg.ejs", {
          title: "Connectivity Issue | CoinCart",
          pageTitle: "There was a connection issue, please try again later",
          message:
            "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
        });
      } else if (error instanceof TypeError) {
        res.send(474);
      } else {
        res.sendStatus(203);
      }
    });
});

app.get("/contact", (req, res) => {
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      res.render(__dirname + "/contact.ejs", {
        title: "Contact | CoinCart",
        btcPrice: priceValues[1],
        ethPrice: priceValues[2],
        ltcPrice: priceValues[3],
        bnbPrice: priceValues[0],
        solPrice: priceValues[4],
      });
    });
});

app.post("/register", (req, res) => {
  if (
    req.body.password == req.body.password_con &&
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(req.body.email)
  ) {
    database
      .query(
        "INSERT INTO users (username,name,password,cart) VALUES ('" +
          req.body.email +
          "','" +
          req.body.name +
          "','" +
          req.body.password +
          "',null);"
      )
      .then((result) => {
        res.render(__dirname + "/ejs/info-pg.ejs", {
          title: "Registeration Success",
          pageTitle: "Account Registration Successful",
          message:
            "<br><br><h6><a style='color:#ff7f00 'href='/login'> Click Here To Conitnue To Login </a> </h6>",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.sendStatus(400);
  }
});

app.post("/review::id", (req, res) => {
  database
    .query(
      "INSERT INTO reviews (id,reviews,rating_sum,rating,reviews_made) VALUES ('" +
        req.params.id +
        "','{\"" +
        username +
        '":["' +
        new Date().toISOString() +
        '" , ' +  req.body.star  +
        ' , "' +
        req.body.review_msg +
        "\"]}' ," +
        req.body.star +
        ", " +
        req.body.star +
        ", 1);"
    ).catch((error) => {
      if (error.code === "23505") {
        console.log(          )
        database.query("UPDATE reviews SET reviews = jsonb_set(reviews::jsonb, '{\"" +
        username +
        "\"}', '[\"" +
        new Date().toISOString() +
        '" , ' +  req.body.star  +
        ' , "' +
        req.body.review_msg +
        " \"]') , " +
        "rating_sum = (SELECT rating_sum FROM reviews WHERE ID = " +
        req.params.id +
        ") + " + req.body.star+ ", " +
        " reviews_made = (SELECT reviews_made FROM reviews WHERE ID = " +
        req.params.id +
        ") + 1" +
        ", rating = (SELECT CAST(rating_sum AS DECIMAL) / CAST(reviews_made AS DECIMAL) FROM reviews WHERE ID = " +
        req.params.id +
        ") WHERE ID = " +
        req.params.id+";")
      }
    }).finally(
      res.redirect("/product-"+req.params.id)
    );
});

app.get("/add-:id", (req, res) => {
  if (username) {
    database
      .query(
        "UPDATE users SET cart = concat(cart , '" +
          req.params["id"] +
          "', ',1;') WHERE username = '" +
          username +
          "';"
      )
      .then(() => {
        item_in_cart += 1;
        res.redirect("/product-" + req.params["id"]);
      })
      .catch((error) => res.send(error));
  } else {
    res.redirect("/login-product-" + req.params.id);
  }
});

app.post("/subscribe-form-footer", (req, res) => {
  database
    .query(
      "INSERT INTO subscribed_users (email_id) VALUES ('" +
        req.body.emailid +
        "');"
    )
    .then(
      (document.getElementById("footer_subscribe").innerHTML =
        "<h2>Subscribed Successfully</h2>")
    )
    .catch((error) => res.send(error));
});
app.get("/shop", (req, res) => {
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      database
        .query("SELECT * FROM products;")
        .then((result) => {
          res.render(__dirname + "/ejs/shop.ejs", {
            title: "Shop | CoinCart",
            products: result,
            pageName: req.body.search_inp,
            btcPrice: priceValues[1],
            ethPrice: priceValues[2],
            ltcPrice: priceValues[3],
            bnbPrice: priceValues[0],
            solPrice: priceValues[4],
          });
        })
        .catch((error) => {
          if (error.errno === -3008) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Connectivity Issue | CoinCart",
              pageTitle: "Unable to Connect To Database Server",
              message:
                "<br><h4>Either The Server is Down or You Have Connectivity Issues.<br>Please Try Again Later</h4><br><br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
            });
          }
        });
    });
});

app.post("/search", (req, res) => {
  res.redirect("/search&q=" + req.body.search_inp);
});

app.get("/search&q=:product", (req, res) => {
  var priceValues = [];
  fetch("https://rest.coinapi.io/v1/exchangerate/USD?invert=true&filter_asset_id=bnb;btc;eth;ltc;sol", {
    headers: {
      "X-CoinAPI-Key": "D1F5B2A4-6DAF-4C46-BB24-08446E6C6BCE",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      response.rates.forEach((element) => {
        priceValues.push(Math.round(element.rate).toString() + " INR");
      });
    })
    .catch(
      (error) =>
        (priceValues = [
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
          "Unable To Fetch Currently",
        ])
    )
    .then(() => {
      database
        .query(
          "SELECT * FROM products WHERE product_name ILIKE '%" +
            req.params["product"] +
            "%' OR product_category ILIKE '%" +
            req.params["product"] +
            "%'; "
        )
        .then((result) => {
          res.render(__dirname + "/ejs/shop.ejs", {
            title: "Your Searched For " + req.params["product"],
            products: result,
            pageName: req.params["product"],
            btcPrice: priceValues[1],
            ethPrice: priceValues[2],
            ltcPrice: priceValues[3],
            bnbPrice: priceValues[0],
            solPrice: priceValues[4],
          });
        })
        .catch((error) => {
          if (error.errno === -3008) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Connectivity Issue | CoinCart",
              pageTitle: "Unable to Connect To Database Server",
              message:
                "<br><h4>Either The Server is Down or You Have Connectivity Issues.<br>Please Try Again Later</h4><br><br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
            });
          }
        });
    });
});