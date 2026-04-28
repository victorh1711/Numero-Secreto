import * as Global from './index.js';
import * as Val from './validate-attemp.js';
import * as Visuals from './visuals.js';

const gameStates = {
    attempCount: 0,
    maxAttemps: 5,
}

function getRandom() {
    return Math.floor(Math.random() * 100) + 1;
}
export let secret_num = getRandom();
window.secret_num  = secret_num;

export function getLimitStorage(){
    const root = getComputedStyle(document.documentElement);
    const limit = root.getPropertyValue("--limit-storage").trim()

    return Number(limit)
}

export function historyAppendAttemp(attemp, cls){

    if (Global.childs.includes(attemp)) {
        return;
    }

    const historyItem = document.createElement("div");
    const pullAttemp = document.createElement("p");

    pullAttemp.textContent = attemp;
    historyItem.appendChild(pullAttemp);

    historyItem.className = "history__item";
    historyItem.classList.add(cls);

    Global.historyList.prepend(historyItem);
    Global.childs.unshift(attemp);

    if (Global.childs.length > Global.limit_storage) {
        Global.childs.pop(); 

        const lastChild = Global.historyList.lastElementChild;
        if (lastChild) {
            lastChild.remove();
        }
    }
}

export function addAttemp(attemp){
    gameStates.attempCount++
    Global.currentAttemp.textContent = attemp

    if(gameStates.attempCount >= gameStates.maxAttemps){
        Visuals.styleButton__endGame("newGame--lose")
        return
    }
}