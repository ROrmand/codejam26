let captchaStep = 0; // 0 = stars, 1 = first essay, 2 = second essay, 3 = finished

const captchaButton = document.getElementById("captcha-start");
const captchaInner = document.getElementById("captcha-inner");

captchaButton.addEventListener("click", () => {
    captchaStep = 1;
    captchaButton.classList.add("hidden");
    document.getElementById("captcha-spinner").classList.remove("hidden");
    setTimeout(() => {
        captchaInner.classList.remove("state1");
        document.getElementById("captcha-state-1").classList.add("hidden");
        captchaInner.classList.add("state2");
    }, 1000 * 5);
});