const membersContainer = document.querySelector("#membersContainer");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

const membersUrl = "data/members.json";

async function fetchMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        renderMembers(data.members || data);
    } catch (error) {
        console.error("Error fetching members data:", error);
        membersContainer.innerHTML = `<p class="error-msg">Unable to load the member directory right now. Please try again later.</p>`;
    }
}

const getMembershipLabel = (level) => {
    switch (level) {
        case 3:
            return "Gold";
        case 2:
            return "Silver";
        default:
            return "Member";
    }
};

const renderMembers = (members) => {
    membersContainer.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        card.classList.add("member-card");

        let portrait = document.createElement("img");
        portrait.setAttribute("src", member.image);
        portrait.setAttribute("alt", `${member.name} logo`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "150");

        let name = document.createElement("h3");
        name.textContent = member.name;

        let industry = document.createElement("p");
        industry.textContent = member.industry;

        let address = document.createElement("p");
        address.textContent = member.address;

        let phone = document.createElement("p");
        phone.textContent = member.phone;

        let website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.textContent = member.website;

        let membershipLevel = document.createElement("p");
        membershipLevel.textContent = `Membership Level: ${getMembershipLabel(member.membershipLevel)}`;

        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(industry);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membershipLevel);

        membersContainer.appendChild(card);
    });
};

fetchMembers();

gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});