const timeField = document.querySelector("#timestamp");
const openBtns = document.querySelectorAll(".level-link");
const closeBtns = document.querySelectorAll(".close-modal-btn");
const dialogs = document.querySelectorAll(".info-modal");

if (timeField) {
    timeField.value = new Date().toISOString();
}

for (const btn of openBtns) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-modal");
        const modalBox = document.querySelector(`#${targetId}`);
        if (modalBox) {
            modalBox.showModal();
        }
    });
}

for (const btn of closeBtns) {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-close");
        const modalBox = document.querySelector(`#${targetId}`);
        if (modalBox) {
            modalBox.close();
        }
    });
}

for (const box of dialogs) {
    box.addEventListener("click", (e) => {
        if (e.target === box) {
            box.close();
        }
    });
}