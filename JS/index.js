import * as Val from './validate-attemp.js';
import * as Visuals from './visuals.js'
import * as Game from './game.js'

export const arc = document.getElementById("arc");
export const arcWrapper = document.getElementById("arcWrapper");
export const currentAttemp = document.getElementById("currentAttemp");
export const historyContainer = document.getElementById("historyContainer");
export const historyList = document.getElementById("historyList");
export const guessInput = document.getElementById("guessInput");
export const submitButton = document.getElementById("submitButton");
export const feedbackMessage = document.getElementById("feedbackMessage");

export const limit_storage = Game.getLimitStorage();
export const childs = []

function initEvents(){
    guessInput.addEventListener("focus", () =>{
        Visuals.showHide_history("flex")
    })
    
    guessInput.addEventListener("focusout", () =>{
        Visuals.showHide_history("none")
    })
    
    submitButton.addEventListener("click", () =>{
        if(submitButton.textContent == "→"){
            const attemp = guessInput.value;
            Val.validateGuess(attemp);
            Game.addAttemp(attemp)
            guessInput.value = ""
        }
        else{
            location.reload()
        }
    })

    window.addEventListener("keydown", (e) =>{
        if(e.key === "Enter"){
            e.preventDefault()
            submitButton.click()
        }
    })
}
initEvents()