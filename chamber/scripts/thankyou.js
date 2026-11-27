const summaryContainer = document.querySelector("#applicationSummary");
const params = new URLSearchParams(window.location.search);

const fields = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email Address", key: "email" },
    { label: "Mobile Phone", key: "phone" },
    { label: "Business / Organization", key: "organization" },
    { label: "Submitted At", key: "timestamp" }
];

if (summaryContainer) {
    fields.forEach((field) => {
        const dt = document.createElement("dt");
        dt.textContent = field.label;

        const dd = document.createElement("dd");
        dd.textContent = params.get(field.key) || "Not provided";

        summaryContainer.appendChild(dt);
        summaryContainer.appendChild(dd);
    });
}