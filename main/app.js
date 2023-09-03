const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname+ '/public'));
app.listen(3001);

app.get("/", (req, res) =>{
    res.render(__dirname+"/index.ejs", {title:"CoinCart | Crypto Based Marketplace"});
});

app.get("/login", (req,res)=>{
res.render(__dirname+"/login.ejs", {title:"Login | CoinCart"});
});

app.get("/register", (req,res) => {
    res.render(__dirname+"/register.ejs" , {title:"Register | CoinCart"});
})