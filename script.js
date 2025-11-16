let likedCats = [];
let totalCats = 15;
let viewedCats = 0;
let nextCatImg = new Image(); // preload

const card = document.getElementById("card");
const catImage = document.getElementById("cat-image");
const likeLabel = document.getElementById("like-label");
const nopeLabel = document.getElementById("nope-label");

async function loadCat() {
    viewedCats++;
    if (viewedCats > totalCats) {
        showSummary();
        return;
    }

    // preload next image
    nextCatImg.src = `https://cataas.com/cat?${Date.now()}`;
    nextCatImg.onload = () => {
        catImage.src = nextCatImg.src;
    }
}

// Animation lebih smooth
function animateCard(direction) {
    card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    card.style.transform = `translateX(${direction * 500}px) rotate(${direction * 45}deg)`;
    card.style.opacity = 0;

    setTimeout(() => {
        card.style.transition = "none";
        card.style.transform = "translateX(0px) rotate(0deg)";
        card.style.opacity = 1;
        likeLabel.style.opacity = 0;
        nopeLabel.style.opacity = 0;

        loadCat(); // tukar gambar baru
    }, 500); 
}
