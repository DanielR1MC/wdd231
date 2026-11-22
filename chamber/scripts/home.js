const currentWeatherEl = document.querySelector("#currentWeather");
const forecastContainerEl = document.querySelector("#forecastContainer");
const spotlightsContainerEl = document.querySelector("#spotlightsContainer");

const apiKey = "ce4679d9fe0cf2028f8ed00fef6ad631";
const lat = 8.8875;
const lon = -64.2456;
const units = "imperial";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const membersDataUrl = "data/members.json";

async function fetchWeather() {
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        renderCurrentWeather(currentData);
        renderThreeDayForecast(forecastData);
    } catch (error) {
        console.error("Weather error:", error);
        currentWeatherEl.innerHTML = `<p>Weather data is currently unavailable.</p>`;
        forecastContainerEl.innerHTML = `<p>Forecast unavailable.</p>`;
    }
}

function renderCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const unitSymbol = units === "metric" ? "°C" : "°F";

    currentWeatherEl.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="64" height="64">
        <div>
            <p class="temp-value"><strong>${temp}${unitSymbol}</strong></p>
            <p class="weather-desc">${description}</p>
        </div>
    `;
}

function renderThreeDayForecast(data) {
    const dailyItems = [];
    for (let i = 8; i < data.list.length && dailyItems.length < 3; i += 8) {
        dailyItems.push(data.list[i]);
    }

    const unitSymbol = units === "metric" ? "°C" : "°F";

    forecastContainerEl.innerHTML = dailyItems.map((item) => {
        const dateObj = new Date(item.dt * 1000);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(item.main.temp);
        const desc = item.weather[0].description;

        return `
            <div class="forecast-day">
                <p><strong>${dayName}</strong></p>
                <p>${temp}${unitSymbol}</p>
                <p class="forecast-desc">${desc}</p>
            </div>
        `;
    }).join("");
}

const getMembershipName = (level) => {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
};

async function loadSpotlights() {
    try {
        const response = await fetch(membersDataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const allMembers = data.members || data;

        const qualified = allMembers.filter(
            (member) => member.membershipLevel === 3 || member.membershipLevel === 2
        );

        const shuffled = [...qualified].sort(() => Math.random() - 0.5);
        const count = Math.min(qualified.length, Math.random() < 0.5 ? 2 : 3);
        const selected = shuffled.slice(0, count);

        renderSpotlights(selected);
    } catch (error) {
        console.error("Error loading spotlights:", error);
        spotlightsContainerEl.innerHTML = `<p>Unable to load spotlights right now.</p>`;
    }
}

function renderSpotlights(members) {
    spotlightsContainerEl.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="160" height="110">
            <h3>${member.name}</h3>
            <p class="spotlight-level">${getMembershipName(member.membershipLevel)} Member</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>
        `;

        spotlightsContainerEl.appendChild(card);
    });
}

fetchWeather();
loadSpotlights();