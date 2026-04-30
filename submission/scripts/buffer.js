// harsd coded for now, can be dynamic later
let bufferScheduled = false;

// Create two functions: scheduleBuffer and startBuffering
// scheduleBuffer takes in a parameter of total video length and schedules a timeout for 1-2 seconds before the end.
// startBuffering creates an infinite buffer and is called by the timeout

const scheduleBuffer = (totalLength) => {
    if (bufferScheduled) return;
    bufferScheduled = true;

    let randomOffset = Math.floor(Math.random() * 5) + 1;
    setTimeout(startBuffering, ((totalLength - randomOffset)) * 1000);
}

const startBuffering = () => {
    window.top.postMessage({type: 'pause'}, '*');
    document.getElementById("buffer-container").classList.remove("hidden");

}