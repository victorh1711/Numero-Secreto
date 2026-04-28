import * as Global from './index.js'
import * as Game from './game.js'

export const STATUS = {
    LOW: "is-low",
    HIGH: "is-high",
    NEAR: "is-near",
    SO_NEAR: "is-so-near",
    CORRECT: "is-correct",
};

// --- Funções de Estado ---

export const setStateMessage = (cls) => {
    const msg = Global.feedbackMessage;
    msg.classList.remove(...Object.values(STATUS));
    msg.classList.add(cls);
};

let arcTimeout;
export function setArcState(state) {
    const { arc, currentAttemp } = Global;
    
    // Reset de classes usando o objeto STATUS
    arc.classList.remove(...Object.values(STATUS));
    arc.classList.add(state);

    clearTimeout(arcTimeout);

    if (state === STATUS.CORRECT) {
        currentAttemp.style.color = "#1d994b";
        triggerHit();
        return;
    }

    // Remove a classe após o feedback visual, exceto se for acerto
    arcTimeout = setTimeout(() => { 
        arc.classList.remove(state);
    }, 500);
}

// --- Animações e Feedback ---

export function triggerHit() {
    const elements = [Global.arcWrapper, Global.currentAttemp];
    
    elements.forEach(el => el.classList.add("is-hit"));

    setTimeout(() => {
        elements.forEach(el => el.classList.remove("is-hit"));
    }, 400);
}

export function shakeInput() {
    const input = Global.guessInput;
    input.classList.add("is-invalid");

    setTimeout(() => {
        input.classList.remove("is-invalid");
    }, 400);
}

// --- Interface e Fluxo ---

export function showHide_History(isVisible) {
    const container = Global.historyContainer;

    if (isVisible) {
        container.style.display = "flex";
    } else {
        container.classList.add("history--out");
        
        setTimeout(() => {
            container.style.display = "none";
            container.classList.remove("history--out");
        }, 200);
    }
}

export function endGame(gameResult) {

    const { submitButton, guessInput } = Global;
    
    if(gameResult == "lose"){
        setStateMessage("is-high");
        Global.currentAttemp.style.color = "#ef4444";
        Global.arc.classList.add("is-high");
        
        Global.currentAttemp.style.fontSize = "6em";
        Global.currentAttemp.textContent = "Lose!";
        Global.feedbackMessage.textContent = `Fim de jogo! Era o número ${secret_num}`;
        Global;
    }

    if(gameResult == "win"){
        setStateMessage("is-correct");
        setArcState("is-correct");
    }

    submitButton.classList.add(gameResult);
    submitButton.textContent = "↺";
    guessInput.disabled = true;
}