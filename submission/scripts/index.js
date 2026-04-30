const skipButton = document.getElementById('skip');

window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'timeupdate') {
        let duration = event.data.duration;
        scheduleBuffer(duration);
        }
    });

    window.addEventListener('message', (event) => {
    if (!event.data || !event.data.type) return;

    if (event.data.type === 'adStarted') {
        skipButton.style.display = 'block';
        tickTimer();
    }
    });

    skipButton.addEventListener('click', () => {
    skipButton.style.display = 'none';
    document.getElementById("survey-container").classList.remove("hidden");
});