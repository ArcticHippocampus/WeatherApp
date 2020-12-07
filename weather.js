const searchInput = document.getElementById('searchInput'); 
const submitBtn = document.getElementById('submit');
const temperatureUnit = document.getElementById('temperature-unit');
const city = document.getElementById('location-value');
const temperature = document.getElementById('temperature-value');
const maxTemperature = document.getElementById('temperature-max-value');
const minTemperature = document.getElementById('temperature-min-value');
const sunrise = document.getElementById('sunrise-value');
const sunset = document.getElementById('sunset-value');
const precipitation = document.getElementById('precipitation-value');
const wind = document.getElementById('wind-value');
const humidity = document.getElementById('humidity-value');
const pressure = document.getElementById('pressure-value');
const feelsLike = document.getElementById('feels-like-value');
const weatherDescription = document.getElementById('weather-description')

let tempF;
let tempMinF;
let tempMaxF;
let tempFeelsLIke;
let unit = 'fahrenheit' 

 function firstSearch() {
  searchInput.value = 'krakow'
  search();
  searchInput.value = ''
 }


 function search() {
     
    searchUnit();


    let searchValue = searchInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=995e325e5959ba5c700518b15a9562d7&units=imperial`)

    .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let file = data;

        tempF = Math.round(file.main.temp);
        tempMinF = Math.round(file.main.temp_min);
        tempMaxF = Math.round(file.main.temp_max);
        tempFeelsLIke = Math.round(file.main.feels_like);
        console.log(tempFeelsLIke)
        
        city.innerHTML = file.name;
        weatherDescription.innerHTML = file.weather[0].description;
        

        render(tempF, tempMinF, tempMaxF, tempFeelsLIke, )

        sunriseTime = new Date(file.sys.sunrise * 1000);
        console.log(sunriseTime);
        sunrise.innerHTML = sunriseTime.getHours() + '.' + sunriseTime.getMinutes();
        sunsetTime = new Date(file.sys.sunset * 1000);
        console.log(sunsetTime);
        sunset.innerHTML = sunsetTime.getHours() + '.' + sunsetTime.getMinutes();
        sunsetTime = new Date(file.sys.sunset);
        
        wind.innerHTML = file.wind.speed + 'km/h';
        humidity.innerHTML = file.main.humidity + '%';
        pressure.innerHTML = file.main.pressure + 'hPa';

       });
    
    }

function unitChange() {

    if (unit === 'fahrenheit'){
        render((tempF - 32) / 2, (tempMinF - 32) / 2, (tempMaxF - 32) / 2, (tempFeelsLIke - 32) / 2, )
        unit = 'celcius'
        temperatureUnit.innerHTML = 'C °'
    }
    
    else if (unit === 'celcius'){
        render(tempF, tempMinF, tempMaxF, tempFeelsLIke, )
        unit = 'fahrenheit'
        temperatureUnit.innerHTML = 'F °'
    }

}

function render(temp, min, max, feel,) {
    temperature.innerHTML = temp + '°';
    minTemperature.innerHTML = min + '°';
    maxTemperature.innerHTML = max + '°';
    feelsLike.innerHTML =  'Feels Like ' + feel + '°';
}

function searchUnit(){

    if(unit === 'celcius'){
        temperatureUnit.innerHTML =  'F °'
        unit = 'fahrenheit'
    }

}

document.addEventListener("DOMContentLoaded", firstSearch())
submitBtn.addEventListener("click", search);
temperatureUnit.addEventListener("click", unitChange);

