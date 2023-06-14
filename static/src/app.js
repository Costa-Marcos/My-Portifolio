// Select the button element
const btnShowMore = document.getElementById('btnShowMore');

// Add a click event listener to the button
btnShowMore.addEventListener('click', () => {
    // Get the inner text of the button
    const buttonText = btnShowMore.innerText.trim();

    // Check the inner text and update accordingly
    if (buttonText === 'Mais') {
        // Update the button content with "Menos" and an upward chevron icon
        btnShowMore.innerHTML = '<p class="my-0">Menos <i class="fa-solid fa-chevron-up" style="color: #ffffff;"></i></p>';
    } else {
        // Update the button content with "Mais" and a downward chevron icon
        btnShowMore.innerHTML = '<p class="my-0">Mais <i class="fa-solid fa-chevron-down" style="color: #ffffff;"></i></p>';
    }
}, { passive: true });

// document.addEventListener("DOMContentLoaded", function(event) {
//     // Activate the carousel
//     const myCarouselElement = document.querySelector('#myCarousel')

//     const carousel = new bootstrap.Carousel(myCarouselElement, {
//       interval: 2000,
//       touch: false
//     })
// });