// QTE: creating pop up window
// Cooldown: put up a timer before the pop up shows up again.
let userClicked = false;
let qteTimerId = 5000;

// function schedules QTE
const scheduleTimer = () => {
    const nextTime = Math.random() * (200 - 100) + 100;
    setTimeout(() => {
        scheduleTimer();
        triggerQTE();
    }, nextTime * 1000);
}

scheduleTimer();

const triggerQTE = () => {
    userClicked = false;
    // unhides the qte container
    // picks a random spot on the screen to move it to
    const container = document.getElementById('qte-container');

    // randomize a box window to click on
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const randomX = Math.floor(Math.random() * (windowWidth - container.offsetWidth));
    const randomY = Math.floor(Math.random() * (windowHeight - container.offsetHeight));
    
    container.style.left = randomX + 'px';
    container.style.top = randomY + 'px';
    
    // pop up the QTE
    document.getElementById("qte-container").classList.remove("hidden");
    document.getElementById("red-flash").classList.remove("hidden");

    // the timer starts, if you don't click the box; reload the page

    setTimeout(() => {
        if (!userClicked) {
            window.top.postMessage({ type: 'fail' }, '*');
        }
    }, 1000 * 5)
}

document.getElementById('qte-container').addEventListener("click", () => {
    userClicked = true;
    document.getElementById("red-flash").classList.add("hidden");
    document.getElementById("qte-container").classList.add("hidden");
})
