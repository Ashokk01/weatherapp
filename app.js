  const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const city = req.body.CityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c86bc83498165c05d873b30ce3f1cff1&units=metric"
  https.get(url, function(response){
    response.on("data", function(data) {;
        const weatherdata = JSON.parse(data);
        console.log(weatherdata);
        const windspeed = weatherdata.wind.speed;
        const humidity = weatherdata.main.humidity;
        const pressure = weatherdata.main.pressure;
        const temp = weatherdata.main.temp;
        const feelslike = weatherdata.weather[0].description;
        const img = weatherdata.weather[0].icon;
        const url1 = "http://openweathermap.org/img/wn/"+img+".png";
        
        res.write("<h1>The temperature in "+city+ " is "+temp+" degree celcius");
        res.write("<h2>It feels like "+feelslike+"</h2>");
        res.write("<img src="+url1+">")
        res.write("<h3>Humidity is "+humidity+"%</h3>");
        res.write("<h3>Pressure is "+pressure+" hPa</h3>");
        res.write("<h3>Wind Speed is "+windspeed+" meter/sec</h3>");
        res.send();

})
    })
  })
app.listen(3000, function(){
  console.log("server is up and running on port 3000");
});
