require('dotenv').config();

const exp = require('constants');
const express =require('express');
const ejs= require('ejs');
const https =require("https");
const app= express();


app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


app.get("/", function (req, res) {
    res.render("home");
});



app.post("/", function(req, res){

    const query=req.body.cityName;
    const key=process.env.KEY;
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"d&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            const temp =weatherData.main.temp;
            const weatherDescription =weatherData.weather[0].description;
            const icon= weatherData.weather[0].icon;
            const imageURL= " http://openweathermap.org/img/wn/"+icon+"@2x.png";

            // res.write("<p>The weather is currently "+weatherDescription+" </p>");
            // res.write("<h1>The temp in "+query+" is "+temp+" degree celcius</h1>");
            // res.write("<img src="+imageURL+">");
            res.render("weather", {wdata:weatherDescription,que:query, tem:temp, imgu:imageURL });
        });
    });
});



app.listen(3000, function(){
    console.log("Server started on port 3000");
});