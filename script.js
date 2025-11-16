let likedCats = [];

// Elements
const catImage = document.getElementById("cat-image");
const summarySection = document.getElementById("summary");
const likedCatsContainer = document.getElementById("liked-cats");
const countSpan = document.getElementById("count");

// Load a new random cat from Cataas API
async function loadCat() {
    const url = `https://cataas.com/cat?${Date.now()}`; 
    catImage.src = url;
}

document.getElementById("like").addEventListener("click", () => {
    likedCats.push(catImage.src);
    checkFinish();
    loadCat();
});

document.getElementById("dislike").addEventListener("click", () => {
    checkFinish();
    loadCat();
});

function checkFinish() {
    if (likedCats.length >= 10) {
        showSummary();
    }
}

function showSummary() {
    document.getElementById("card-container").style.display = "none";
    document.querySelector(".buttons").style.display = "none";

    summarySection.style.display = "block";
    countSpan.innerText = likedCats.length;

    likedCats.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        likedCatsContainer.appendChild(img);
    });
}

// Start the first cat
loadCat();
