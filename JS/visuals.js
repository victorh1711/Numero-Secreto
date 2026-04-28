import * as Global from './index.js'

export function showHide_History(disp){
    if(disp == "flex"){
        Global.historyContainer.style.display = "flex"
    }

    if(disp == "none"){
        Global.historyContainer.classList.toggle("history--out");

        setTimeout(() => {

            Global.historyContainer.classList.remove("history--out")  
            Global.historyContainer.style.display = "none"
        }, 200);
    }
}

export const STATUS = {
    LOW: "is-low",
    HIGH: "is-high",
    NEAR: "is-near",
    SO_NEAR: "is-so-near",
    CORRECT: "is-correct",
};


export const setStateMessage = (cls) => {
    const msg = Global.feedbackMessage;

    msg.classList.remove(...Object.values(STATUS));
    msg.classList.add(cls);
};


let feedbackTimeout;
export function setArcState(state) {
    Global.arc.classList.remove(...Object.values(STATUS));
    Global.arc.classList.add(state);

    clearTimeout(feedbackTimeout);

    
    if(state == "is-correct"){
        Global.currentAttemp.style.color = "#1d994b"
        triggerHit()
        return
    }
    feedbackTimeout = setTimeout(() => { 
        Global.arc.classList.remove(state);
    }, 500);
    
}

export function triggerHit() {
    Global.arcWrapper.classList.add("is-hit");
    Global.currentAttemp.classList.add("is-hit")

    setTimeout(() => {
      Global.arcWrapper.classList.remove("is-hit");
      Global.currentAttemp.classList.remove("is-hit")
    }, 400);
}

export function shakeInput(){
    Global.guessInput.classList.add("is-invalid")

    setTimeout(() => {

        Global.guessInput.classList.remove("is-invalid")
    }, 400);
}

export function styleButton_endGame(gameResult){
    Global.submitButton.classList.add(gameResult)
    Global.submitButton.textContent = "↺"
    Global.guessInput.disabled = true
}