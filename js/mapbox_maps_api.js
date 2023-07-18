const favBtn = document.querySelector('#favorite-btn');
(() => {

	// Global Variables
	const map = initializeMap();
	// const marker = createMarker();
	// const popup	= createPopup();
	const favoriteRestaurants= [
		{
			name: "Sea Island",
			address: "5959 Northwest Loop 410, San Antonio, TX 78238",
			category: "seafood",
			favorite_dish: "yes"
		},
		{
			name: "Pappadeaux",
			address: "76 NE Interstate 410 Loop, San Antonio, TX 78216",
			category: "seafood",
			favorite_dish: "yes"
		},
		{
			name: "Fire Wok",
			address: "11075 I-10, San Antonio, TX 78230",
			category: "fusion",
			favorite_dish: "yes"
		}
	]

	// Functions
	function initializeMap(){
	mapboxgl.accessToken = MAPBOX_TOKEN;

	console.log("inside initialize Map")
	const mapOptions={
		container: 'map',
		style: 'mapbox://styles/mapbox/satellite-streets-v12',
		zoom: 10,
		center: [-98.4916, 29.4252]
	}
	return new mapboxgl.Map(mapOptions)
}
	function displayFavRestaurant(favoriteRestaurants, map) {
		favoriteRestaurants.forEach((restaurant) => {
			markFavorite(restaurant, map);
		})
	}
	function markFavorite(restaurant, map) {
		geocode(restaurant.address, MAPBOX_TOKEN).then((data) => {
			console.log(data)
			const restaurantPopup = new mapboxgl.Popup()
				.setHTML(`<p>${restaurant.name}</p>`);
			const restaurantMarker = new mapboxgl.Marker()
				.setLngLat(data)
				.addTo(map)
				.setPopup(restaurantPopup);
			restaurantPopup.addTo(map);
		});
	}

	// Events
	favBtn.addEventListener('click', ()=>{
		displayFavRestaurant(favoriteRestaurants, map)
	});



})();