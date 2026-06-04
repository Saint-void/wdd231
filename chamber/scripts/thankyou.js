const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");
const applicationSummary = document.querySelector("#applicationSummary");
const submittedValues = new URLSearchParams(window.location.search);

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

const requiredFields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email Address", "email"],
    ["Mobile Phone", "phone"],
    ["Business/Organization", "organization"],
    ["Submitted", "timestamp"]
];

function formatValue(key, value) {
    if (key !== "timestamp" || value === "Not provided") {
        return value;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short"
    });
}

requiredFields.forEach(([label, key]) => {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    const value = submittedValues.get(key) || "Not provided";

    term.textContent = label;
    detail.textContent = formatValue(key, value);

    applicationSummary.append(term, detail);
});
