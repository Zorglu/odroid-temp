odroid-temp
===========

Use Odroid's temp sensor with NodeJS
A single small module to easily read the temperature sensor on Odroid

## Installation
 NodeJS versions 10.12.x are currently supported and tested.

### Install from NPM (Easy way)
    $ npm install odroid-temp
    
## API

```javascript

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

```

Ref : http://odroid.us/mediawiki/index.php?title=Temperature_Checking
