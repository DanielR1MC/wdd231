const currentWeather = document.querySelector("#currentWeather");
const forecastContainer = document.querySelector("#forecastContainer");
const spotlightsContainer = document.querySelector("#spotlightsContainer");

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=8.8875&lon=-64.2456&units=imperial&appid=ce4679d9fe0cf2028f8ed00fef6ad631";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=8.8875&lon=-64.2456&units=imperial&appid=ce4679d9fe0cf2028f8ed00fef6ad631";
const membersUrl = "data/members.json";

async function weatherFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
        currentWeather.innerHTML = "<p>Weather data is currently unavailable.</p>";
    }
}

async function forecastFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
        forecastContainer.innerHTML = "<p>Forecast unavailable.</p>";
    }
}

function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    currentWeather.innerHTML = `
        <img src="${iconSrc}" alt="${desc}" width="64" height="64">
        <div>
            <p class="temp-value"><strong>${temp}&deg;F</strong></p>
            <p class="weather-desc">${desc}</p>
        </div>
    `;
}

function displayForecast(data) {
    const dailyData = [];
    for (let i = 8; i < data.list.length && dailyData.length < 3; i += 8) {
        dailyData.push(data.list[i]);
    }

    forecastContainer.innerHTML = dailyData.map((item) => {
        const dayName = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(item.main.temp);
        const desc = item.weather[0].description;

        return `
            <div class="forecast-day">
                <p><strong>${dayName}</strong></p>
                <p>${temp}&deg;F</p>
                <p class="forecast-desc">${desc}</p>
            </div>
        `;
    }).join("");
}

function getMembershipName(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

async function spotlightsFetch() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            const allMembers = data.members || data;
            const qualified = allMembers.filter((m) => m.membershipLevel === 3 || m.membershipLevel === 2);
            const shuffled = [...qualified].sort(() => Math.random() - 0.5);
            const count = Math.min(qualified.length, Math.random() < 0.5 ? 2 : 3);
            displaySpotlights(shuffled.slice(0, count));
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
        spotlightsContainer.innerHTML = "<p>Unable to load spotlights right now.</p>";
    }
}

function displaySpotlights(members) {
    spotlightsContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "spotlight-card";
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy" width="160" height="110">
            <h3>${member.name}</h3>
            <p class="spotlight-level">${getMembershipName(member.membershipLevel)} Member</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a>
        `;
        spotlightsContainer.appendChild(card);
    });
}

weatherFetch();
forecastFetch();
spotlightsFetch();