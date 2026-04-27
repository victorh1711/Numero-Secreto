import * as Val from './validate-attemp.js';
import * as Visuals from './visuals.js'

export const arc = document.getElementById("arc");
export const arcWrapper = document.getElementById("arcWrapper");
export const currentAttemp = document.getElementById("currentAttemp");
export const historyContainer = document.getElementById("historyContainer");
export const historyList = document.getElementById("historyList");
export const guessInput = document.getElementById("guessInput");
export const submitButton = document.getElementById("submitButton");
export const feedbackMessage = document.getElementById("feedbackMessage");


function getRandom() {
    return Math.floor(Math.random() * 100) + 1;
}
export let secret_num = getRandom();
window.secret_num  = secret_num;

function getLimitStorage(){
    const root = getComputedStyle(document.documentElement);
    const limit = root.getPropertyValue("--limit-storage").trim()

    return Number(limit)
}

const limit_storage = getLimitStorage();
const childs = []
export function appendGuess(attemp, cls){

    if (childs.includes(attemp)) {
        return;
    }

    const historyItem = document.createElement("div");
    const pullAttemp = document.createElement("p");

    pullAttemp.textContent = attemp;
    historyItem.appendChild(pullAttemp);

    historyItem.className = "history__item";
    historyItem.classList.add(cls);

    historyList.prepend(historyItem);
    childs.unshift(attemp);

    if (childs.length > limit_storage) {
        childs.pop(); 

        const lastChild = historyList.lastElementChild;
        if (lastChild) {
            lastChild.remove();
        }
    }
}

export function pullCurrentAttemp(attemp){
    currentAttemp.textContent = attemp;
}

export function winGame(){
    submitButton.classList.add("newGame")
    submitButton.textContent = "↺"
    guessInput.disabled = true
}

function initEvents(){
    guessInput.addEventListener("focus", () =>{
        Visuals.show_hide__history("flex")
    })
    
    guessInput.addEventListener("focusout", () =>{
        Visuals.show_hide__history("none")
    })
    
    submitButton.addEventListener("click", () =>{
        if(submitButton.textContent == "→"){
            const attemp = guessInput.value;
            Val.validateGuess(attemp);
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