let surveyStep = 0; // 0 = stars, 1 = first essay, 2 = second essay, 3 = finished

document.getElementById("stars").addEventListener("click", () => {
    surveyStep = 1;
    document.getElementById("star-question").classList.add("hidden");
    document.getElementById("essay1-question").classList.remove("hidden");
});

const validateWords = (textArea, required) => {
    const wordCount = textArea.value.split(" ");
    if (wordCount.length < required || wordCount.length > required) {
        const errorField = document.getElementById("survey-error");
        errorField.textContent = "Please enter " + required + " words.";
        errorField.classList.remove("hidden");
        return false;
    }

    return true;
}

document.getElementById("next-question").addEventListener("click", () => {
    if (surveyStep === 1) {
        const textArea = document.getElementById("essay1-text");

        if(!validateWords(textArea, 200)) {
            return;
        }
    
        surveyStep = 2;
        document.getElementById("essay1-question").classList.add("hidden");
        document.getElementById("essay2-question").classList.remove("hidden");
    }

    if (surveyStep === 2) {
        const textArea = document.getElementById("essay2-text");

        if(!validateWords(textArea, 100)) {
            return;
        }
    
        surveyStep = 3;
        document.getElementById("essay2-question").classList.add("hidden");
        document.getElementById("survey-end").classList.remove("hidden");
    }

    if (surveyStep === 3) {
        document.getElementById("survey-container").classList.add("hidden");
    }
    
})
