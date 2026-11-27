const summaryContainer = document.querySelector("#applicationSummary");
const params = new URLSearchParams(window.location.search);

const fields = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email Address", key: "email" },
    { label: "Mobile Phone", key: "phone" },
    { label: "Business / Organization", key: "organization" },
    { label: "Membership Level", key: "membershipLevel" },
    { label: "Submitted At", key: "timestamp" }
];

const membershipLabels = {
    np: "NP Membership (Non-Profit)",
    bronze: "Bronze Membership",
    silver: "Silver Membership",
    gold: "Gold Membership"
};

function formatMembershipLevel(rawValue) {
    if (!rawValue) {
        return "Not provided";
    }

    const normalizedKey = rawValue.trim().toLowerCase();
    return membershipLabels[normalizedKey] || rawValue;
}

function formatTimestamp(rawValue) {
    if (!rawValue) {
        return "Not provided";
    }

    const parsedDate = new Date(rawValue);
    if (Number.isNaN(parsedDate.getTime())) {
        return rawValue;
    }

    return parsedDate.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium"
    });
}

if (summaryContainer) {
    fields.forEach((field) => {
        const dt = document.createElement("dt");
        dt.textContent = field.label;

        const dd = document.createElement("dd");
        const rawValue = params.get(field.key);

        if (field.key === "timestamp") {
            dd.textContent = formatTimestamp(rawValue);
        } else if (field.key === "membershipLevel") {
            dd.textContent = formatMembershipLevel(rawValue);
        } else {
            dd.textContent = rawValue || "Not provided";
        }

        summaryContainer.appendChild(dt);
        summaryContainer.appendChild(dd);
    });
}