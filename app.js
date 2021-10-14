const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "25d44b5ed5f0be0874aa15fe8d891a25";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      console.log(temp, weatherDescription);

      res.setHeader("Content-Type", "text/html");

      res.write(`<h3>Weather conditions: ${weatherDescription}</h3>`);
      res.write(
        `<h1>The temperature in ${query} is ${temp} degrees celcius </h1>`
      );
      res.write(`<img src = "${imageURL}">`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
