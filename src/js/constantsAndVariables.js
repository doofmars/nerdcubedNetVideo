const BOOKER_CATCH = true;
var timeInterval;

var variables = {
		"views": 0,
		"videos": 0, //score
		"progress": 0, //progress 0-100
		"time":100, //total time
		"gamestate":2, //2: started 1:running 0:game over
};

/*
Recipie for games. To add new game name and elements_key is required.
Name corresponds to .jpg file name in /image/ as game tumbnail.
Thumbnail size is 200px*300px
*/
var recipes = [
{"name": "Counterstrike",
	"elements_key": ["w","s","a","d"],
	"elements_value": [10,10,10,10]},
{"name": "Fable",
	"elements_key": ["c","q","l","d"],
	"elements_value": [10,10,10,10]},
{"name": "GTA5",
	"elements_key": ["x","y","a","b"],
	"elements_value": [10,10,10,10]},
{"name": "Fuel",
	"elements_key": ["up","down","left","right"],
	"elements_value": [10,10,10,10]},
{"name": "Just_Cause_2",
	"elements_key": ["a","b","l","o"],
	"elements_value": [10,10,10,10]},	
{"name": "OMSI",
	"elements_key": ["up","down","left","right"],
	"elements_value": [10,10,10,10]},
{"name": "Euro_Truck_Simulator_2",
	"elements_key": ["up","down","left","right"],
	"elements_value": [10,10,10,10]},	
{"name": "Watchdogs",
	"elements_key": ["7","5","9","6"],
	"elements_value": [10,10,10,10]}	
            ];