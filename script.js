
const apiKey = "Add your api key here";

const weatherDataEl = document.getElementById("weather-data")
const inputEl = document.getElementById("city-input")

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const CityValue = inputEl.value;
    getWeatherData(CityValue);
});

async function getWeatherData(cityvalue){
    try {
     
        const report = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&APPID=${apiKey}&units=metric`)
        if (!report.ok){
            throw new Error("Network Response Has Some Issues");
        }
        const data = await report.json();
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels Like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed:${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Wearther icon">`
        weatherDataEl.querySelector(".tempreture").textContent = `${temp}°C`;
        weatherDataEl.querySelector(".description").textContent = desc;
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>
            `<div>${detail}</div>`).join("");

    } catch (error) {
        console.log(error)
        weatherDataEl.querySelector(".icon").innerHTML = ""
        weatherDataEl.querySelector(".tempreture").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "Something went Wrong!";
        weatherDataEl.querySelector(".details").innerHTML = "";
       
    }
}