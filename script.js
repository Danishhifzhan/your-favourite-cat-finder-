// Variables
let likedCats = [];
let viewedCats = 0;
const totalCats = 15;

const card = document.getElementById("card");
const catImage = document.getElementById("cat-image");
const likeLabel = document.getElementById("like-label");
const nopeLabel = document.getElementById("nope-label");
const summarySection = document.getElementById("summary");
const likedCatsContainer = document.getElementById("liked-cats");
const countSpan = document.getElementById("count");

// Preload next image
let nextCatImg = new Image();

function loadCat() {
    viewedCats++;
    if(viewedCats > totalCats){
        showSummary();
        return;
    }

    // Preload next cat image
    nextCatImg.src = `https://cataas.com/cat?${Date.now()}`;
    nextCatImg.onload = () => catImage.src = nextCatImg.src;
}

// Button clicks
document.getElementById("like").addEventListener("click", () => {
    likedCats.push(catImage.src);
    animateCard(1);
});

document.getElementById("dislike").addEventListener("click", () => {
    animateCard(-1);
});

// Touch swipe for mobile
let startX = 0;

card.addEventListener("touchstart", e => startX = e.touches[0].clientX);

card.addEventListener("touchmove", e => {
    let diff = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;

    likeLabel.style.opacity = diff > 80 ? 1 : 0;
    nopeLabel.style.opacity = diff < -80 ? 1 : 0;
});

card.addEventListener("touchend", e => {
    let diff = e.changedTouches[0].clientX - startX;
    if(diff > 120){
        likedCats.push(catImage.src);
        animateCard(1);
    } else if(diff < -120){
        animateCard(-1);
    } else {
        resetCardPosition();
    }
});

// Optional: Mouse drag support for desktop
let isDragging = false;
let dragStartX = 0;

card.addEventListener("mousedown", e => {
    isDragging = true;
    dragStartX = e.clientX;
});

document.addEventListener("mousemove", e => {
    if(!isDragging) return;
    let diff = e.clientX - dragStartX;
    card.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;
    likeLabel.style.opacity = diff > 80 ? 1 : 0;
    nopeLabel.style.opacity = diff < -80 ? 1 : 0;
});

document.addEventListener("mouseup", e => {
    if(!isDragging) return;
    isDragging = false;
    let diff = e.clientX - dragStartX;
    if(diff > 120){
        likedCats.push(catImage.src);
        animateCard(1);
    } else if(diff < -120){
        animateCard(-1);
    } else {
        resetCardPosition();
    }
});

// Animate card off screen
function animateCard(direction){
    card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    card.style.transform = `translateX(${direction*500}px) rotate(${direction*45}deg)`;
    card.style.opacity = 0;

    setTimeout(() => {
        resetCardPosition();
        loadCat();
    }, 500);
}

// Reset card to center
function resetCardPosition(){
    card.style.transition = "none";
    card.style.transform = "translateX(0px) rotate(0deg)";
    card.style.opacity = 1;
    likeLabel.style.opacity = 0;
    nopeLabel.style.opacity = 0;
}

// Show summary of liked cats
function showSummary(){
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

// Load the first cat
loadCat();
