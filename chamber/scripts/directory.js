const dataUrl = "data/members.json";
const memberShowcase = document.querySelector("#memberShowcase");
const cardModeButton = document.querySelector("#cardModeButton");
const ledgerModeButton = document.querySelector("#ledgerModeButton");
const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");
const memberCount = document.querySelector("#memberCount");
const sectorCount = document.querySelector("#sectorCount");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

async function fetchMembers() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const members = await response.json();
        updateHighlights(members);
        renderMembers(members);
    } catch (error) {
        console.error("Failed to load directory data:", error);
        memberShowcase.innerHTML = `<p class="directory-error">Unable to load business records at this time.</p>`;
    }
}

function updateHighlights(members) {
    const uniqueSectors = new Set(members.map((member) => member.industry));

    memberCount.textContent = members.length;
    sectorCount.textContent = uniqueSectors.size;
}

function getMembershipLabel(level) {
    if (level === 3) return "Premier Partner";
    if (level === 2) return "Growth Partner";
    return "Local Member";
}

function renderMembers(members) {
    memberShowcase.innerHTML = "";

    members.forEach((member) => {
        const profile = document.createElement("section");
        profile.className = `member-profile tier-${member.membershipLevel}`;

        profile.innerHTML = `
            <div class="member-media">
                <img src="${member.image}" alt="${member.name} business image" loading="lazy" width="190" height="120">
            </div>
            <div class="member-details">
                <h2>${member.name}</h2>
                <span class="sector-chip">${member.industry}</span>
                <div class="member-contact">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p>Founded ${member.founded}</p>
                </div>
                <span class="tier-pill">${getMembershipLabel(member.membershipLevel)}</span>
                <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
            </div>
        `;
        profile.querySelector("a").className = "profile-link";
        memberShowcase.appendChild(profile);
    });
}

function setDirectoryView(viewName) {
    const showCards = viewName === "cards";

    memberShowcase.classList.toggle("exchange-grid", showCards);
    memberShowcase.classList.toggle("ledger-list", !showCards);

    cardModeButton.classList.toggle("is-selected", showCards);
    ledgerModeButton.classList.toggle("is-selected", !showCards);

    cardModeButton.setAttribute("aria-pressed", showCards);
    ledgerModeButton.setAttribute("aria-pressed", !showCards);
}

cardModeButton.addEventListener("click", () => setDirectoryView("cards"));
ledgerModeButton.addEventListener("click", () => setDirectoryView("ledger"));

fetchMembers();
