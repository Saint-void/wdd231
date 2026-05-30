const weatherApiKey = "bafcf679c8674201e730d226ddebbd0e";
const lagosLatitude = 6.5244;
const lagosLongitude = 3.3792;
const membersUrl = "data/members.json";

const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");
const currentTemp = document.querySelector("#currentTemp");
const weatherDescription = document.querySelector("#weatherDescription");
const forecastList = document.querySelector("#forecastList");
const spotlightCards = document.querySelector("#spotlightCards");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

function titleCase(text) {
    return text
        .split(" ")
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ");
}

function formatForecastDate(dateText) {
    const date = new Date(`${dateText}T12:00:00`);
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
}

async function loadWeather() {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lagosLatitude}&lon=${lagosLongitude}&units=metric&appid=${weatherApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lagosLatitude}&lon=${lagosLongitude}&units=metric&appid=${weatherApiKey}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data request failed.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData.list);
    } catch (error) {
        console.error("Unable to load weather data:", error);
        currentTemp.textContent = "Weather unavailable";
        weatherDescription.textContent = "Please check again later.";
        forecastList.innerHTML = "";
    }
}

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    weatherDescription.textContent = titleCase(data.weather[0].description);
}

function displayForecast(forecastItems) {
    const today = new Date().toISOString().split("T")[0];
    const dailyForecasts = forecastItems
        .filter((item) => item.dt_txt.includes("12:00:00"))
        .filter((item) => item.dt_txt.split(" ")[0] > today)
        .slice(0, 3);

    forecastList.innerHTML = "";

    dailyForecasts.forEach((item) => {
        const forecastCard = document.createElement("div");
        forecastCard.className = "forecast-card";
        forecastCard.innerHTML = `
            <span>${formatForecastDate(item.dt_txt.split(" ")[0])}</span>
            <strong>${Math.round(item.main.temp)}&deg;C</strong>
        `;
        forecastList.appendChild(forecastCard);
    });
}

function getMembershipLabel(level) {
    return level === 3 ? "Gold Member" : "Silver Member";
}

function shuffleMembers(members) {
    return [...members].sort(() => Math.random() - 0.5);
}

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const members = await response.json();
        const spotlightMembers = shuffleMembers(
            members.filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3)
        ).slice(0, 3);

        displaySpotlights(spotlightMembers);
    } catch (error) {
        console.error("Unable to load member spotlights:", error);
        spotlightCards.innerHTML = `<p class="directory-error">Unable to load member spotlights.</p>`;
    }
}

function displaySpotlights(members) {
    spotlightCards.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "spotlight-card";
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="160" height="96">
            <div>
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>${getMembershipLabel(member.membershipLevel)}</p>
                <a href="${member.website}" target="_blank" rel="noopener">Website</a>
            </div>
        `;
        spotlightCards.appendChild(card);
    });
}

loadWeather();
loadSpotlights();
