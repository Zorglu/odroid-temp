var Temp = require("./lib/odroid-temp.js");

// Create new instance on Temp object
var tempCelcius = new Temp();

//Create new instance on Temp object with parameters
var tempFarenheiht = new Temp("f");

// Get temperature
tempCelcius.read(function(err, value) {
	if (err !== null) {
		console.log("Temperature read error", err);
	} else {
		console.log("Temperature %d °C", value);
	}
});

// watch for temperature celcius change
tempCelcius.on("change", function(value) {
	console.log("Temperature %d °C", value);
});

//watch for temperature fareineiht change
tempFarenheiht.on("change", function(value) {
	console.log("Temperature %d °F", value);
});

