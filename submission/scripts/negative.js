let skipTimer = 10;
let notSkippingThisTime = false;

const checkCanPass = () => {
    if (sessionStorage.getItem("passedSkipTimer")) {
        return true;
    }

    notSkippingThisTime = true;
    sessionStorage.setItem("passedSkipTimer", true);
    return false;
}

const tickTimer = () => {
    if (skipTimer <= 0 && !notSkippingThisTime) {
        if (checkCanPass()) {
            document.getElementById("skip").textContent = "Skip by taking short survey";
            document.getElementById("skip").removeAttribute("disabled")
            return;
        }
    }

    document.getElementById("skip").textContent = "You can skip in " + skipTimer;

    skipTimer--;
    setTimeout(() => tickTimer(), 1000);
}