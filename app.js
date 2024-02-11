const express = require("express");
require("dotenv").config();
const pg = require("pg-promise")();
const parser = require("body-parser");
const fetch = require("node-fetch");
const session = require("express-session");
const mailer = require("nodemailer");
const app = express();

app.use(
  session({
    secret: process.env.ENC_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

const mailTransporter = mailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

app.use(parser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// COIN MARKET API URL : ADD  BACK WHEN COMMITING
// https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol

// URL END
const connectionURL =
  "postgresql://retool:69xhVYmQuste@ep-morning-cherry-23207962.us-west-2.retooldb.com/retool?sslmode=require";
const database = pg(connectionURL);

app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || 3001);

app.get("/", (req, res) => {
  var priceValues = [];
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
        .query("SELECT * FROM PRODUCTS ORDER BY RANDOM() LIMIT 10;")
        .then((result) => {
          res.render(__dirname + "/index.ejs", {
            item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
            title: "CoinCart | Crypto Based Marketplace",
            btcPrice: priceValues[1],
            ethPrice: priceValues[2],
            products: result,
            ltcPrice: priceValues[3],
            bnbPrice: priceValues[0],
            solPrice: priceValues[4],
          });
        });
    });
});

app.get("/about", (req, res) => {
  var priceValues = [];
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
      res.render(__dirname + "/about.ejs", {
        title: "About Project | CoinCart",
        item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
        btcPrice: priceValues[1],
        ethPrice: priceValues[2],
        ltcPrice: priceValues[3],
        bnbPrice: priceValues[0],
        solPrice: priceValues[4],
      });
    });
});

app.get("/privacy", (req, res) => {
  var priceValues = [];
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
      res.render(__dirname + "/privacy.ejs", {
        title: "Privacy Policy | CoinCart",
        item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
        btcPrice: priceValues[1],
        ethPrice: priceValues[2],
        ltcPrice: priceValues[3],
        bnbPrice: priceValues[0],
        solPrice: priceValues[4],
      });
    });
});

app.get(/^\/login(?:-([\w-]+))?(?:&F=([\w-]+)_([\w-]+))?$/, (req, res) => {
  var priceValues = [];
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
      if (!req.session.userName) {
        var noUser =
          "User Not Found, Please Check Your Email/Username Again and Retry";
        var wrongPass = "Wrong Password, Please Check Your Password and Retry";
        res.render(__dirname + "/login.ejs", {
          title: "Login | CoinCart",
          item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
          redirect: req.params["0"] || undefined,
          alertMessage: req.params["1"]
            ? req.params["1"] === "U"
              ? noUser
              : req.params["1"] === "P"
              ? wrongPass
              : ""
            : null,
          displayProp: req.params["2"] ? "block" : "none",
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
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
      if (req.session.userName) {
        database
          .query(
            "SELECT * FROM users WHERE username = '" +
              req.session.userName +
              "';"
          )
          .then((result) => {
            result = result[0];
            res.render(__dirname + "/account.ejs", {
              title: "Your Account | CoinCart",
              item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
              fullName: req.session.fullName,
              userName_EMail: req.session.userName,
              addresses: result.addresses,
              activeOrders: result.active_orders,
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
                pageTitle:
                  "There was a connection issue, please try again later",
                message:
                  "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
              });
            }
          });
      } else {
        res.redirect("/login-account");
      }
    });
});

app.get("/register:combinePara?", (req, res) => {
  var priceValues = [];
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
      res.render(__dirname + "/register.ejs", {
        title: "Register | CoinCart",
        displayProp: req.params.combinePara ? "block" : "none",
        alertMessage:
          req.params.combinePara === "&A"
            ? "User Already Exists, Try Logging In Instead"
            : "&W"
            ? "Passwords Do Not Match, Make Sure You Enter Same Password In Confirm Password Field"
            : "&E"
            ? "Email Seems Sus, Please Enter A Real Email Address"
            : none,
        item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
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
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
          "SELECT * FROM products LEFT JOIN reviews ON products.id = reviews.id WHERE products.id = " +
            req.params["id"] +
            ";"
        )
        .then((result) => {
          result = result[0];
          res.render(__dirname + "/ejs/product.ejs", {
            item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
            title: result.product_name,
            productName: result.product_name,
            productImage: result.product_img,
            category: result.product_category,
            productPrice: result.product_price,
            code: result.id,
            username: req.session.userName,
            productRating: result.rating,
            reviews: result.reviews,
            totalReviews: result.reviews_made,
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
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
      if (req.session.userName != null) {
        //User Logged-In
        var cartProducts = [];
        database
          .query(
            "SELECT cart FROM users WHERE username= '" +
              req.session.userName +
              "';"
          )
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

                  item_in_cart: req.session.itemInCart
                    ? req.session.itemInCart
                    : 0,
                  productsInCart: cartProducts,
                  name: req.session.fullName,
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

                item_in_cart: req.session.itemInCart
                  ? req.session.itemInCart
                  : 0,
                productsInCart: [],
                name: req.session.fullName,
                btcPrice: priceValues[1],
                ethPrice: priceValues[2],
                ltcPrice: priceValues[3],
                bnbPrice: priceValues[0],
                solPrice: priceValues[4],
              });
            }
          })
          .catch((error) => {
            if (error.errno === -4039) {
              res.render(__dirname + "/ejs/info-pg.ejs", {
                title: "Connectivity Issue | CoinCart",
                pageTitle:
                  "There was a connection issue, please try again later",
                message:
                  "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
              });
            }
            res.send(error);
          });
      } else {
        //User Not Logged-In
        res.render(__dirname + "/cart.ejs", {
          title: "Cart",

          item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
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
    .query(
      "SELECT * FROM users WHERE username= '" +
        req.body.username.toLowerCase() +
        "';"
    )
    .then((result) => {
      if (result[0].password == req.body.password) {
        req.session.userName = req.body.username.toLowerCase();
        req.session.fullName = result[0].name;
        if (result[0].cart !== null) {
          req.session.itemInCart = result[0].cart
            .slice(0, -1)
            .split(";").length;
        } else {
          req.session.itemInCart = 0;
        }
        req.session.save();
        if (req.body.redirect !== "") {
          res.redirect("/" + req.body.redirect);
        } else {
          res.redirect("/");
        }
      } else {
        if (req.body.redirect !== "") {
          res.redirect("/login-" + req.body.redirect + "&F=P_B");
        } else res.redirect("/login&F=P_B");
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
        if (req.body.redirect !== "") {
          res.redirect("/login-" + req.body.redirect + "&F=U_B");
        } else res.redirect("/login&F=U_B");
      } else {
        console.log(error);
      }
    });
});

app.get("/contact", (req, res) => {
  var priceValues = [];
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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

        item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
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
        "SELECT * FROM users WHERE username = '" + req.body.username + "';"
      )
      .then((result) => {
        if (result.length === 0) {
          req.session.registrationCode = Math.floor(
            Math.random() * 1000000
          ).toString();
          mailTransporter.sendMail({
            from: "CoinCart aryanshdevyt@gmail.com",
            to: req.body.email,
            headers: {
              "X-Priority": "1", v
            },
            subject: "Account Verification Code | CoinCart",
            html:
              "<div style='text-align:center;font-family: sans-serif; margin: 2.5%; padding:2.5%; border-radius:15px;  border: 2.5px solid #ff7f00; '> <img src='https://coincart.onrender.com/assets/img/icon/loder.png' width='40%'><hr><h2> Your Verification Code Is </h2> <h1> " +
              req.session.registrationCode +
              "</h1> <p> Don't Share It With Anyone <br> If You Did Not Request A Verification Code, Please Ignore This Email. </p></div>",
          });
          req.session.registrationINFO =
            req.body.email.toLowerCase() +
            "','" +
            req.body.name +
            "','" +
            req.body.password;
          res.redirect("/otpcheck");
        } else {
          res.redirect("/register&A");
        }
      });
  } else {
    if (req.body.password !== req.body.password_con) {
      res.redirect("/register&W");
    } else {
      res.redirect("/register&E");
    }
  }
});

app.post("/review::id", (req, res) => {
  database
    .query(
      "INSERT INTO reviews (id,reviews,rating_sum,rating,reviews_made) VALUES ('" +
        req.params.id +
        "','{\"" +
        req.session.userName +
        '":["' +
        new Date().toISOString() +
        '" , "' +
        req.session.fullName +
        '" , ' +
        req.body.star +
        ' , "' +
        req.body.review_msg +
        "\"]}' ," +
        req.body.star +
        ", " +
        req.body.star +
        ", 1);"
    )
    .catch((error) => {
      if (error.errno === -4039) {
        res.render(__dirname + "/ejs/info-pg.ejs", {
          title: "Connectivity Issue | CoinCart",
          pageTitle: "There was a connection issue, please try again later",
          message:
            "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
        });
      }
      if (error.code === "23505") {
        database.query(
          "UPDATE reviews SET reviews = jsonb_set(reviews::jsonb, '{\"" +
            req.session.userName +
            "\"}', '[\"" +
            new Date().toISOString() +
            '" , "' +
            req.session.fullName +
            '" , ' +
            req.body.star +
            ' , "' +
            req.body.review_msg +
            " \"]') , " +
            "rating_sum = (SELECT rating_sum FROM reviews WHERE ID = " +
            req.params.id +
            ") + " +
            req.body.star +
            ", " +
            " reviews_made = (SELECT reviews_made FROM reviews WHERE ID = " +
            req.params.id +
            ") + 1" +
            ", rating = CAST((SELECT (CAST(rating_sum AS DECIMAL) + " +
            req.body.star +
            ")/ (CAST(reviews_made AS DECIMAL) +1) FROM reviews WHERE ID = " +
            req.params.id +
            ") AS DECIMAL) WHERE ID = " +
            req.params.id +
            ";"
        );
      }
    })
    .finally(res.redirect("/product-" + req.params.id + "?tab=three"));
});

app.get("/add-:id", (req, res) => {
  if (req.session.userName) {
    database
      .query(
        "UPDATE users SET cart = concat(cart , '" +
          req.params["id"] +
          "', ',1;') WHERE username = '" +
          req.session.userName +
          "';"
      )
      .then(() => {
        req.session.itemInCart += 1;
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
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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

            item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
            products: result,
            pageName: "Shop",
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
          if (error.errno === -4039) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Connectivity Issue | CoinCart",
              pageTitle: "There was a connection issue, please try again later",
              message:
                "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
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
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
            title: "Your Searched For " + req.params.product,
            item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
            products: result,
            pageName: req.params.product,
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
          if (error.errno === -4039) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Connectivity Issue | CoinCart",
              pageTitle: "There was a connection issue, please try again later",
              message:
                "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
            });
          }
        });
    });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.post("/delrev", (req, res) => {
  database
    .query(
      "UPDATE reviews SET reviews = reviews::JSONB - '" +
        req.session.userName +
        "', " +
        " rating_sum = (SELECT rating_sum FROM reviews WHERE ID = " +
        req.body.procode +
        ") - " +
        req.body.stars +
        ", " +
        " reviews_made = (SELECT reviews_made FROM reviews WHERE ID = " +
        req.body.procode +
        ") - 1" +
        ", rating =  CASE WHEN reviews_made > 1 THEN CAST((SELECT (CAST(rating_sum AS DECIMAL) - " +
        req.body.stars +
        ")/ (CAST(reviews_made AS DECIMAL) - 1) FROM reviews WHERE ID = " +
        req.body.procode +
        ") AS DECIMAL) ELSE 0 END WHERE ID = " +
        req.body.procode +
        ";"
    )
    .then(res.redirect("/product-" + req.body.procode))
    .catch((error) => {
      if (error.errno === -4039) {
        res.render(__dirname + "/ejs/info-pg.ejs", {
          title: "Connectivity Issue | CoinCart",
          pageTitle: "There was a connection issue, please try again later",
          message:
            "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
        });
      }
    });
});

app.post("/delAdd:adderKey", (req, res) => {
  if (req.session.userName) {
    database
      .query(
        "UPDATE users SET addresses = addresses::JSONB - '" +
          req.params.adderKey +
          "' WHERE username = '" +
          req.session.userName +
          "';"
      )
      .then(res.redirect("/account"));
  } else {
    res.redirect("/login");
  }
});

app.post("/addNewAddress/?:isCheckout?", (req, res) => {
  var value =
    req.body.fullName +
    "|" +
    req.body.phoneNum +
    "|" +
    req.body.address +
    ", " +
    req.body.state +
    ", " +
    req.body.country +
    " - " +
    req.body.pin;
  database
    .query(
      "UPDATE users SET addresses = jsonb_set(addresses::jsonb,'{" +
        req.body.addressName +
        "}', '\"" +
        value +
        "\"', true) WHERE username = '" +
        req.session.userName +
        "';"
    )
    .then(() => {
      if (req.params.isCheckout) {
        res.redirect("/checkout");
      } else {
        res.redirect("/account");
      }
    });
});

app.post("/changepass", (req, res) => {
  if (req.session.userName) {
    database
      .query(
        "SELECT password FROM users WHERE username = '" +
          req.session.userName +
          "';"
      )
      .then((result) => {
        if (
          result[0].password == req.body.currentPass &&
          req.body.conPass1 == req.body.conPass2
        ) {
          database
            .query(
              "UPDATE users SET password = '" +
                req.body.conPass1 +
                "' WHERE username = '" +
                req.session.userName +
                "';"
            )
            .then(req.session.destroy(), res.redirect("/login"))
            .catch();
        }
      })
      .catch();
  } else {
    res.redirect("/login");
  }
});

app.post("/empty-cart", (req, res) => {
  if (req.session.userName) {
    database
      .query(
        "UPDATE users SET cart = NULL WHERE username = '" +
          req.session.userName +
          "';"
      )
      .then((req.session.itemInCart = 0), res.redirect("/cart"))
      .catch();
  } else {
    res.redirect("/login");
  }
});

app.post("/update-cart", (req, res) => {
  database
    .query(
      "UPDATE users SET cart = '" +
        req.body.newCartString +
        "' WHERE username = '" +
        req.session.userName +
        "';"
    )
    .then(res.redirect("/cart"))
    .catch((error) => {
      if (error.errno === -4039) {
        res.render(__dirname + "/ejs/info-pg.ejs", {
          title: "Connectivity Issue | CoinCart",
          pageTitle: "There was a connection issue, please try again later",
          message:
            "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
        });
      }
    });
});

app.post("/changename", (req, res) => {
  if (req.session.userName) {
    database
      .query(
        "UPDATE users SET name = '" +
          req.body.newName +
          "' WHERE username = '" +
          req.session.userName +
          "';"
      )
      .then((req.session.fullName = req.body.newName), res.redirect("/account"))
      .catch((error) => {
        if (error.errno === -4039) {
          res.render(__dirname + "/ejs/info-pg.ejs", {
            title: "Connectivity Issue | CoinCart",
            pageTitle: "There was a connection issue, please try again later",
            message:
              "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
          });
        }
      });
  } else {
    res.redirect("/login");
  }
});

app.post("/checkout", (req, res) => {
  var priceValues = [];
  fetch(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=bnb,btc,eth,ltc,sol",
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY_MAIN,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      for (var asset in response.data) {
        priceValues.push(
          Math.round(response.data[asset][0].quote.USD.price).toString() +
            " USD"
        );
      }
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
          "SELECT * FROM users WHERE username = '" + req.session.userName + "';"
        )
        .then((result) => {
          result = result[0];
          res.render(__dirname + "/checkout.ejs", {
            item_in_cart: req.session.itemInCart ? req.session.itemInCart : 0,
            title: "CoinCart | Crypto Based Marketplace",
            addresses: result.addresses,
            products: req.body.proInfo,
            btcPrice: priceValues[1],
            ethPrice: priceValues[2],
            ltcPrice: priceValues[3],
            bnbPrice: priceValues[0],
            solPrice: priceValues[4],
          });
        })
        .catch((error) => {
          if (!req.session.userName) {
            res.redirect("/login-cart");
          }
          if (error.errno === -4039) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Connectivity Issue | CoinCart",
              pageTitle: "There was a connection issue, please try again later",
              message:
                "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
            });
          }
        });
    });
});

app.get("/checkout", (req, res) => {
  res.redirect("/cart");
});

app.post("/payment", (req, res) => {
  if (req.session.userName) {
    database
      .query(
        "UPDATE users SET active_orders = CONCAT(active_orders, '" +
          req.body.orderJSON +
          "#'), cart = null WHERE username = '" +
          req.session.userName +
          "' ;"
      )
      .then(() => {
        req.session.itemInCart = 0;
        res.render(__dirname + "/dummyPayment.ejs", {
          title: "Dummy Payment",
          totalAmount: req.body.total,
        });
      })
      .catch();
  } else {
    res.redirect("/login-cart");
  }
});

app.get("/ping", (req, res) => {
  res.send(
    "<body style='text-align:center; padding:5%; font-size:larger'><h1>SERVER ONLINE</h1><img src='https://media1.tenor.com/images/770d07a0b28b45dd88a15a93879741a2/tenor.gif?itemid=14178373'> <br><br><br><a href='/'> RETURN TO HOME PAGE </a><br><br>&copy;ARYANSH GUPTA</body>"
  );
});

app.get("/reset-password:display?", (req, res) => {
  res.render(__dirname + "/password-reset.ejs", {
    title: "Reset Password | CoinCart",
    displayProp: req.params.display ? "block" : "none",
  });
});

app.post("/resetPass:display?", (req, res) => {
  if (req.session.timesCodeSent ? req.session.timesCodeSent : 0 < 5) {
    database
      .query(
        "SELECT * FROM users WHERE username = '" + req.body.username + "';"
      )
      .then((result) => {
        if (result.length > 0) {
          req.session.resetPassEmail = req.body.username;
          req.session.resetCode = Math.floor(
            Math.random() * 1000000
          ).toString();
          mailTransporter.sendMail({
            from: "CoinCart aryanshdevyt@gmail.com",
            to: result[0].username,
            headers: {
              "X-Priority": "1",
            },
            subject: "CoinCart Password Reset",
            html:
              "<div style='text-align:center;font-family: sans-serif; margin: 2.5%; padding:2.5%; border-radius:15px;  border: 2.5px solid #ff7f00; '> <img src='https://coincart.onrender.com/assets/img/icon/loder.png' width='40%'><hr><h2> Your Password Reset Code Is </h2> <h1> " +
              req.session.resetCode +
              "</h1> <p> Don't Share It With Anyone <br> If You Did Not Request A Password Reset, Please Ignore This Email. </p></div>",
          });
          res.redirect("/otpcheck");
        } else {
          res.redirect("/reset-password-1");
        }
      });
  } else {
    res.render(__dirname + "/ejs/info-pg.ejs", {
      title: "Too Many Attempts",
      pageTitle: "You Have Reached The Maximum Limit Reset Attempts",
      message:
        "<br><h4>Try Again Later</h4> <h6><a style='color:#ff7f00 'href='/login'> Click Here To Return To Login Page </a> </h6>",
    });
  }
  req.session.timesCodeSent = req.session.timesCodeSent
    ? req.session.timesCodeSent + 1
    : 0;
});

app.get("/otpcheck:display?", (req, res) => {
  let msg = req.session.resetCode
    ? "Password Reset"
    : req.session.registrationCode
    ? "Verification"
    : undefined;
  if (msg) {
    res.render(__dirname + "/ejs/check-otp.ejs", {
      title: "Reset Password | CoinCart",
      codeType: msg,
      otpMessage:
        "A " +
        msg +
        " Code Has Been Sent To Your Email. Please Enter The Code Below. If You Don't Receive The Code Within 3 Minutes, Please Check Spam Folder",
      displayProp: req.params.display ? "block" : "none",
    });
  } else {
    res.redirect("/");
  }
});

app.post("/check-otp-:type", (req, res) => {
  let codeToMatch =
    req.params.type === "Password Reset"
      ? req.session.resetCode
      : req.session.registrationCode;
  if (req.body.otp === codeToMatch) {
    if (req.params.type === "Password Reset") {
      res.render(__dirname + "/reset-pass-page.ejs", {
        title: "Enter New Password",
        displayProp: "none",
      });
    } else if (req.params.type === "Verification") {
      database
        .query(
          "INSERT INTO users (username,name,password,cart) VALUES ('" +
            req.session.registrationINFO +
            "',null);"
        )
        .then((result) => {
          delete req.session.registrationCode;
          delete req.session.registrationINFO;
          res.render(__dirname + "/ejs/info-pg.ejs", {
            title: "Registration Success",
            pageTitle: "Account Registration Successful",
            message:
              "<br><br><h6><a style='color:#ff7f00 'href='/login'> Click Here To Conitnue To Login </a> </h6>",
          });
        })
        .catch((error) => {
          if (error.code == 23505) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Registration Success",
              pageTitle: "Account Already Exists",
              message:
                "<br><br><h6><a style='color:#ff7f00 'href='/login'> Click Here </a> To Conitnue To Login or <a style='color:#ff7f00 'href='/register'> Click Here </a> To Create New Account </h6>",
            });
          }
          if (error.errno === -4039) {
            res.render(__dirname + "/ejs/info-pg.ejs", {
              title: "Connectivity Issue | CoinCart",
              pageTitle: "There was a connection issue, please try again later",
              message:
                "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
            });
          }
        });
    }
  } else {
    res.redirect("/otpcheck-1");
  }
});

app.post("/reset-pass", (req, res) => {
  if (req.body.pass === req.body.conpass) {
    database
      .query(
        "UPDATE users SET password = '" +
          req.body.pass +
          "' WHERE username = '" +
          req.session.resetPassEmail +
          "';"
      )
      .then(() => {
        delete req.session.resetCode;
        delete req.session.resetPassEmail;
        res.render(__dirname + "/ejs/info-pg.ejs", {
          title: "Reset Success",
          pageTitle: "Password Reset Successful",
          message:
            "<br><br><h6><a style='color:#ff7f00 'href='/login'> Click Here To Conitnue To Login With New Password </a> </h6>",
        });
      });
  } else {
    res.render(__dirname + "/reset-pass-page.ejs", {
      title: "Enter New Password",
      displayProp: "block",
    });
  }
});

// AT LAST
app.all("*", (req, res) => {
  res.status(404).render(__dirname + "/ejs/info-pg.ejs", {
    title: "Lost ?",
    pageTitle: "Sadly, Your Destination Is Unknown To Us",
    message:
      "<h6> 404 : Not Found </h6> <br><h5><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h5>",
  });
});
