const summaryBox = document.querySelector("#applicationSummary");
const queryData = new URLSearchParams(window.location.search);

const formItems = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Email Address", name: "email" },
    { label: "Mobile Phone", name: "phone" },
    { label: "Business / Organization", name: "organization" },
    { label: "Membership Level", name: "membershipLevel" },
    { label: "Submitted At", name: "timestamp" }
];

const levelNames = {
    np: "NP Membership (Non-Profit)",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};

function getLevelText(val) {
    if (!val) return "Not provided";
    const key = val.trim().toLowerCase();
    return levelNames[key] || val;
}

function getDateText(val) {
    if (!val) return "Not provided";
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return val;
    return d.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium"
    });
}

if (summaryBox) {
    for (const item of formItems) {
        const dt = document.createElement("dt");
        dt.textContent = item.label;

        const dd = document.createElement("dd");
        const value = queryData.get(item.name);

        if (item.name === "timestamp") {
            dd.textContent = getDateText(value);
        } else if (item.name === "membershipLevel") {
            dd.textContent = getLevelText(value);
        } else {
            dd.textContent = value || "Not provided";
        }

        summaryBox.appendChild(dt);
        summaryBox.appendChild(dd);
    }
}