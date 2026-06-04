const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");
const timestamp = document.querySelector("#timestamp");
const modalLinks = document.querySelectorAll("[data-modal]");
const modalCloseButtons = document.querySelectorAll(".modal-close");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;
timestamp.value = new Date().toISOString();

navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const modal = document.querySelector(`#${link.dataset.modal}`);

        if (modal && typeof modal.showModal === "function") {
            event.preventDefault();
            modal.showModal();
        }
    });
});

modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
