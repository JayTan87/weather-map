(() => {



"use strict";

//Global Variables
let cardGen = document.querySelector('.card-wrapper')


//Functions



//Events



//Run on App load
// Base URL for forecast API
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Simple way to create URL for request based on coordinates
function getWeatherURL(lat, lon) {
	return `${OPEN_WEATHER_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
}

const ALAMO_COORDINATES = ['29.4260', '-98.4861'];

// TODO: log URL

console.log(getWeatherURL(ALAMO_COORDINATES[0], ALAMO_COORDINATES[1]));

const URL = getWeatherURL(...ALAMO_COORDINATES);

// TODO: log full response from API

// $.ajax(URL).done(data => {
//   console.log(data);
// }).fail(console.error);


// TODO: log various parts of the API

$.ajax(URL).done(data => {
	// console.log(data);

	renderWeather(data);
	// // TODO: log the city name
	// console.log(data);
	// // TODO: log the first three-hour forecast block
	// console.log(data.list[0].main.feels_like);
	// // TODO: log the humidity for the first three-hour block
	// console.log(data.list[0].wind.deg);
}).fail(console.error);


// TODO: log the humidity for all days

// $.ajax(getWeatherURL(...ALAMO_COORDINATES))
//     .done((data) => {
//
//         data.list.forEach((day, index) => {
//             if (index % 8 === 0) {
//                 console.log(day.main.humidity);
//             }
//         });
//
//         // OR
//
//         for (let i = 0; i < data.list.length; i += 8) {
//             console.log(data.list[i].main.humidity);
//         }
//
//     })
//     .fail(console.error);


// TODO: log the min and max temp for each day

// $.ajax(getWeatherURL(...ALAMO_COORDINATES))
//     .done(data => {
//         console.log(data);
//         const minMaxTemps = returnMinMaxTemps(data);
//         minMaxTemps.forEach(minMaxTemp => {
//             console.log(minMaxTemp);
//         });
//     })
//     .fail(console.error);


		function renderWeather(data) {

			for (let i = 0; i < data.list.length; i++) {
				let weatherBody = document.createElement('div')
				weatherBody.classList.add("card");
				console.log(data.list[i].main.temp);
				let minMax = returnMinMaxTemps(data);
				// console.log(`${minMax}`);
				weatherBody.innerHTML = `
			<div class="col text-center">${minMax[i].date}</div>
			<div class="col text-center">Temperature High: ${minMax[i].max}</div>
			<div class="col text-center">Temperature Low: ${minMax[i].min}</div>
			<div class="col text-center">Descritpion: ${data.list[i].weather[0].description}</div>
			<div class="col text-center">Humidity: ${data.list[i].main.humidity}</div>
			<div class="col text-center">Wind Gust: ${data.list[i].wind.gust}</div>
			<div class="col text-center">Pressure: ${data.list[i].main.pressure}</div>
			`;
				cardGen.appendChild(weatherBody);
			}
		}

	// renderWeather(data);
})();
