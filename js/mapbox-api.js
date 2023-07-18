$(() => {

	// Global Variables
	const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/forecast';
	const map = initializeMap();
	const marker = createMarker();
	// const popup = createPopup();
	const userInput = document.querySelector('#userInput')
	const ALAMO_COORDINATES = ['29.4260', '-98.4861'];
	let cardGen = document.querySelector('.card-wrapper')


	// Functions
	function getWeatherURL(lat, lon) {
		return `${OPEN_WEATHER_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
	}
	// Function that initializes the map
	function initializeMap() {
		mapboxgl.accessToken = MAPBOX_TOKEN;

		const mapOptions = {
			container: 'map',
			style: 'mapbox://style,s/mapbox/satellite-streets-v12',
			zoom: 10,
			center: [-98.4916, 29.4252]
		}
		return new mapboxgl.Map(mapOptions)
	}

	// Function that creates a marker at Codeup
	function createMarker() {
		return new mapboxgl.Marker()
			.setLngLat([-98.4916, 29.4252])
			.addTo(map);
	}



	function searchInput(userInputValue, map) {
		geocode(userInputValue, MAPBOX_TOKEN).then((data) => {
			console.log(data[1]);
			updateWeather(data[1],data[0])

			const userInputPopup = new mapboxgl.Popup()
				.setHTML(`<p>${userInputValue}</p>`);
			marker
				.setLngLat(data)
				.addTo(map)
				.setPopup(userInputPopup);
			map.flyTo({
				center: data
			})
			// .setPopup(userInputPopup);
			console.log(userInputValue)
			// userInputPopup.addTo(map);
		})
	}
	map.on('click', (e) => {

		updateWeather(e.lngLat.lat,e.lngLat.lng)
			marker
				.setLngLat(e.lngLat)
				.addTo(map)

			map.flyTo({
				center: e.lngLat
			});

		});


	// function updateWeather(lat, lon) {
		function getWeatherURL(lat, lon) {
			return `${OPEN_WEATHER_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
		}

	function updateWeather(lat, lon) {
		$.ajax(getWeatherURL(lat, lon)).done(data => {
			removeWeather()
			renderWeather(data);
		}).fail(console.error);
	}
	function removeWeather() {
			$('div.card').remove();
	}
	// }
	function renderWeather(data) {
		for (let i = 0; i < data.list.length; i += 8) {
			let weatherBody = document.createElement('div')
			weatherBody.classList.add("card","bg-primary","bg-gradient","bg-opacity-25","increase", "card-back");
			console.log(data.list[i].main.temp);
			let weatherImage = "";
			if (data.list[i].weather[0].main === "Sunny") {
				weatherImage = '../img/sunny.png'
			}
			if (data.list[i].weather[0].main === "Rain") {
				weatherImage = '../img/lightrain.png'
			}
			if (data.list[i].weather[0].main === "Clouds") {
				weatherImage = '../img/overcast.png'
			}
			if (data.list[i].weather[0].main === "Clear") {
				weatherImage = '../img/sunny.png'
			}
			let minMax = returnMinMaxTemps(data);
			console.log(data.list[i].weather[0].main);
			 console.log(`${data.list[0].dt_txt}`);
			weatherBody.innerHTML = `
			<div class="col text-center text-light">${minMax[i/8].date}</div>
			<img src=${weatherImage} class="card-img opacity-100 icon center">
		
			<div class="col text-center text-light">Temperature High: ${minMax[i/8].max}</div>
			<div class="col text-center text-light">Temperature Low: ${minMax[i/8].min}</div>
			<div class="col text-center text-light">Descritpion: ${data.list[i].weather[0].description}</div>
			<div class="col text-center text-light">Humidity: ${data.list[i].main.humidity}</div>
			<div class="col text-center text-light">Wind Gust: ${data.list[i].wind.gust}</div>
			<div class="col text-center text-light">Pressure: ${data.list[i].main.pressure}</div>
			`;
			cardGen.appendChild(weatherBody);
		}
	}

	document.querySelector('#search-btn').addEventListener('click', () => {
		searchInput(userInput.value, map);
	});


//Global Variables


//Functions



//Events



//Run on App load
// Base URL for forecast API
	updateWeather(...ALAMO_COORDINATES)

// Simple way to create URL for request based on coordinates

// animation


});