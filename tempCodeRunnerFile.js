res.render(__dirname + "/ejs/info-pg.ejs", {
            title: "Connectivity Issue | CoinCart",
            pageTitle: "There was a connection issue, please try again later",
            message:
              "<br><h6><a style='color:#ff7f00 'href='/'> Click Here To Return To HomePage </a> </h6>",
          });