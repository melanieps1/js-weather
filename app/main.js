var zipInput = document.getElementById("zipInput");
var weatherButton = document.getElementById("weatherButton");

var error = document.getElementById("error");
var errorMessage = document.getElementById("errorMessage");

var temperatureOutputK = document.getElementById("temperatureOutputK");
var temperatureOutputF = document.getElementById("temperatureOutputF");
var temperatureOutputC = document.getElementById("temperatureOutputC");
var cityOutput = document.getElementById("cityOutput");
var conditionOutput = document.getElementById("conditionOutput");
var weatherImage = document.getElementById("weatherImage");

var apiRequest;

// Wait for the page to load before making button work, and then perform the getWeather function when the now working button is clicked
document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		weatherButton.onclick = getWeather;
	}
};

function getWeather() {
	var url="http://api.openweathermap.org/data/2.5/weather?zip=<zipcode>&us&appid=7e07a542d4ac42bdff71c3a89d46c95c";
	url = url.replace("<zipcode>", zipInput.value) // Parameter 1 in () is what you want to replace, parameter 2 is what you want to replace paramater 1 with.
	// Now, the URL for the API call is formatting correctly based on input

	apiRequest = new XMLHttpRequest();
	apiRequest.onload = catchResponse; // `onload` is when a transaction completes successfully, `catchResponse` is a function we need to create.
	apiRequest.onerror = httpRequestOnError; // `onerror` is when a transaction does not complete successfully, `httpRequestOnError` is a function we need to create.
	apiRequest.open ('get', url, true)
	apiRequest.send();

	// console.log(zipInput.value); // Without the `.value`, the console logs the whole html line instead of the zipInput value
	// console.log(url);
}

function catchResponse() {
	if (apiRequest.statusText === "OK") {
		errorMessage.innerHTML = '';
		error.style.display = 'none';
		output.style.display = 'block';

		parseResponse();
	}
	else {
		errorMessage.innerHTML = JSON.parse(apiRequest.responseText).message;
		error.style.display = 'block';
		output.style.display = 'none';
	}

	console.log(JSON.parse(apiRequest.responseText));
}

function parseResponse() {

	var results = JSON.parse(apiRequest.responseText);
	var tempK = Math.round(results.main.temp);
	var tempF = Math.round(9/5 * (tempK - 273) + 32);
	var tempC = tempK - 273;

	temperatureOutputK.innerHTML = tempK + "&deg;";
	temperatureOutputF.innerHTML = tempF + "&deg;";
	temperatureOutputC.innerHTML = tempC + "&deg;";

	cityOutput.innerHTML = results.name;
	
	conditionOutput.innerHTML = results.weather[0].description;

	if (tempF > 85) {
		weatherImage.src = "https://i.pinimg.com/originals/83/e8/cc/83e8cca4c99f41f2512832ceac5be321.jpg";
	} else if (tempF > 65) {
		weatherImage.src = "http://ghk.h-cdn.co/assets/16/29/980x490/landscape-1468881327-smiling-pitbull.jpg";
	} else if (tempF > 32) {
		weatherImage.src = "https://dogbreathblog.files.wordpress.com/2012/10/363c5215-editlogo.jpg?w=914&h=609";
	} else {
		weatherImage.src = "https://16347-presscdn-0-0-pagely.netdna-ssl.com/wp-content/uploads/2017/04/tangomunch_pitbull8-720x720.png";
	}
}

function httpRequestOnError() {
	alert("Request is bad!")
}