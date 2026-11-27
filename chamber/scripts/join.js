const timestampInput = document.querySelector("#timestamp");
const modalLinks = document.querySelectorAll(".level-link");
const closeButtons = document.querySelectorAll(".close-modal-btn");
const modals = document.querySelectorAll(".info-modal");

if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const modalId = link.getAttribute("data-modal");
        const targetModal = document.querySelector(`#${modalId}`);
        if (targetModal) {
            targetModal.showModal();
        }
    });
});

closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close");
        const targetModal = document.querySelector(`#${modalId}`);
        if (targetModal) {
            targetModal.close();
        }
    });
});

modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});