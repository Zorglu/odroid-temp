var Temp = require ('./lib/odroid-temp.js').Temp;

// Create new instance on Temp object
var temp = new Temp();

//Get temperature
temp.read(function(err, value){
	if( err !== null){
		console.log("Temperature read error", err);
	}else{
		console.log("Temperature %d °C", value);
	}
});

//watch for temperature change
temp.on('change', function(value){
	console.log("Temperature %d °C", value);
});
