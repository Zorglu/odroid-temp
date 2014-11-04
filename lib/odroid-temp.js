/*jslint node: true */
"use strict";
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var TEMP         = {};
TEMP.CELCIUS     = "c";
TEMP.FARENHEIHT = "f";
//Poll frequency
TEMP.POLL        = 2000;
//For kernel 3.0.x
TEMP.KERNEL_3_0  = "/sys/devices/platform/tmu/temperature";
//For kernel 3.8.x
TEMP.KERNEL_3_8  = "/sys/devices/virtual/thermal/thermal_zone0/temp";

function Temp() {
	this.mode = TEMP.KERNEL_3_8;
	this.unit = TEMP.CELCIUS;
	this.poll = TEMP.POLL;
	this.oldtemp = -100;
	this.inter = null;
	
	this.init = function() {
		createListener.call(this);
	};
	
	this.read = function(cb) {
		var temp = this;
		fs.readFile(this.mode, 'utf-8', function(err, data) {
			var value = 0;
			if (err !== null) {
				throw new Error('Failed to read ' + temp.mode );
			} else {
				value = (data / 1000);
				if(temp.unit == TEMP.FARENHEIHT){
					value = value * 1.8 + 32;
				}
			}
			cb(err, value);
		});
	};

	EventEmitter.call(this);
	this.init();

	function createListener() {
		/*jshint validthis:true */
		var temp = this;
		setInterval(function(){
        	temp.read(function(err, value) {
				if (err !== null) {
					throw new Error('Failed to read value after a change on ' + temp.mode);
				} else {
					if( value != temp.oldtemp ){
						temp.emit('change', value);
						temp.oldtemp = value;						
					}
				}
			});
		}, temp.poll);
	}
}

util.inherits(Temp, EventEmitter);

exports.Temp = Temp;