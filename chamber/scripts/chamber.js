const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");
const menuToggle = document.querySelector("#menuToggle");
const navList = document.querySelector("#navList");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
}