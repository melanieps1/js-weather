var zipInput = document.getElementById("zipInput");
var weatherButton = document.getElementById("weatherButton");

var error = document.getElementById("error");
var errorMessage = document.getElementById("errorMessage");

var conditionOutput = document.getElementById("conditionOutput")
var temperatureOutputK = document.getElementById("temperatureOutputK");
var temperatureOutputF = document.getElementById("temperatureOutputF");
var temperatureOutputC = document.getElementById("temperatureOutputC");
var cityOutput = document.getElementById("cityOutput");

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
	}
	else {
		errorMessage.innerHTML = JSON.parse(apiRequest.responseText).message;
		error.style.display = 'block';
		output.style.display = 'none';
	}

	console.log(apiRequest);
}

function httpRequestOnError() {
	alert("Request is bad!")
}