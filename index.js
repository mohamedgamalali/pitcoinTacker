const express     =  require("express");
const bodyparseer =  require("body-parser");
const request     =  require("request");

const app = express();

app.use(bodyparseer.urlencoded({extended: true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res)
{
  var options ={
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
      from:req.body.crypto,
      to:req.body.fiat,
      amount:req.body.amount
    }
  }
  request(options,function(err,respons,body)
  {
    console.log(body);
    var jsO   = JSON.parse(body);

    var price = jsO.price ;
    var time  = jsO.time  ;
    res.write("<p>price in "+ time + "</p>")
    res.write("<h1>the price of " + req.body.amount + req.body.crypto + ": " + price +" "+ req.body.fiat + "</h1>");
    res.send();
  });
});

app.listen(3000,function()
{
  console.log("listening on 3000 ...");
});
