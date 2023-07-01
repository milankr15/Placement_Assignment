const button = document.querySelector("#button");

// Debounce function
function debounce(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
}

// Change screen function
function changeScreen() {
    // Change between full screen and normal screen
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
    console.log("Screen Change!");
} 

// Debounced Click function
const debouncedClick = debounce(changeScreen, 500);

// Add event listener to button element with debouncedClick function as callback function
button.addEventListener("click", debouncedClick);