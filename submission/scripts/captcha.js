let captchaStep = 0; // 0 = initial captcha, 1 = draw 5, 2 = draw a smiley face, 3 = draw mona lisa

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
        document.getElementById("captcha-state-2").classList.remove("hidden");
    }, 1000 * 5);
});

// drawing shit

const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const clearBtn = document.getElementById('clearBtn');

let drawing = false;

ctx.lineCap = 'round';
ctx.lineJoin = 'round';

function startPosition(e) {
    drawing = true;
    draw(e);
}

function finishedPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = lineWidth.value;
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPosition(e);
});
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function isCanvasBlank() {
    const context = canvas.getContext('2d');
    const pixelData = context.getImageData(0, 0, canvas.width, canvas.height).data;

    // pixelData is a massive array of [r, g, b, a, r, g, b, a...]
    // We check if the Alpha (every 4th value) is greater than 0
    for (let i = 0; i < pixelData.length; i += 4) {
        if (pixelData[i + 3] !== 0) {
            return false; // Found a pixel that isn't transparent
        }
    }
    return true; 
}


// drawing questions

const captchaSubmitButton = document.getElementById("captcha-submit");
let allowedToSubmitMona = false;

const errorCaptcha = () => {
    document.getElementById("captcha-error").textContent = "Failed to verify drawing."
    document.getElementById("captcha-error").classList.add("failed")
}

const verifyNotBlank = () => {
    if (isCanvasBlank()) {
        errorCaptcha()
        return true;
    }

    return false;
}

captchaSubmitButton.addEventListener("click", () => {
    if(captchaStep === 1) {
        if (verifyNotBlank()) return;
        captchaStep = 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("captcha-error").classList.remove("failed")
        document.getElementById("captcha-error").innerHTML = `Successfully verified the drawing. 2 more remaining.`
        document.getElementById("captcha-prompt").innerHTML = `<strong>Please draw a smiley face.</strong> <a target="_blank" href="references/smiley_face.webp">[Reference]</a>`
        return;
    }

    if(captchaStep === 2) {
        if (verifyNotBlank()) return;
        captchaStep = 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("captcha-error").classList.remove("failed")
        document.getElementById("captcha-error").innerHTML = `Successfully verified the drawing. 1 more remaining.`
        document.getElementById("captcha-prompt").innerHTML = `<strong>Please draw the mona lisa.</strong> <a target="_blank" href="references/mona_lisa.jpeg">[Reference]</a>`
        setTimeout(() => allowedToSubmitMona = true, 1000 * 60 * 3);
        return;
    }

    if (captchaStep === 3) {
        if (verifyNotBlank()) return;

        if (!allowedToSubmitMona) {
            errorCaptcha();
            return;
        }

        window.top.postMessage({ type: 'success' }, '*');
    }
})