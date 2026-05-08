const container = document.getElementById('main-container');
const bgLayer = document.getElementById('bg-layer');
const dots = document.querySelectorAll('.dot');
const pages = document.querySelectorAll('.page');
let currentIndex = 0;
let isScrolling = false;

function updatePage() {
    isScrolling = true;

    // Move content pages
    container.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Move the background divider (5vw shift per page)
    const bgMove = currentIndex * 5;
    bgLayer.style.transform = `translateX(-${bgMove}vw)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    setTimeout(() => { isScrolling = false; }, 800);
}

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    if (Math.abs(e.deltaY) < 10) return; // Ignore tiny scrolls

    if (e.deltaY > 0 && currentIndex < pages.length - 1) {
        currentIndex++;
        updatePage();
    } else if (e.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
        updatePage();
    }
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    if (["ArrowRight", "ArrowDown"].includes(e.key) && currentIndex < pages.length - 1) {
        currentIndex++;
        updatePage();
    } else if (["ArrowLeft", "ArrowUp"].includes(e.key) && currentIndex > 0) {
        currentIndex--;
        updatePage();
    }
});