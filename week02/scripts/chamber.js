const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector(".navigation");

currentyear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});

const url = "data/members.json";

async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data.members || data);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

const getMembershipName = (level) => {
    switch (level) {
        case 3:
            return "Gold";
        case 2:
            return "Silver";
        default:
            return "Member";
    }
};

const displayMembers = (members) => {
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

        let address = document.createElement("p");
        address.textContent = member.address;

        let phone = document.createElement("p");
        phone.textContent = member.phone;

        let website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.textContent = member.website;

        let membershipLevel = document.createElement("p");
        membershipLevel.textContent = `Membership Level: ${getMembershipName(member.membershipLevel)}`;

        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membershipLevel);

        membersContainer.appendChild(card);
    });
};

getMembersData();

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});