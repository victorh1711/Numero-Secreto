import * as Global from './index.js';
import * as Visuals from './visuals.js';

// --- Estado do Jogo ---
const gameStates = {
    attempCount: 0,
    maxAttemps: 10,
    history: []
};

function getRandom() {
    return Math.floor(Math.random() * 100) + 1;
}

export const secret_num = getRandom();


// --- Helpers ---
export function getLimitStorage() {
    const root = getComputedStyle(document.documentElement);
    const limit = root.getPropertyValue("--limit-storage").trim();
    return Number(limit) || 5; // Fallback para 5 se não houver CSS
}

// --- Lógica de Negócio ---
export function addAttemp(attemp) {
    if (Global.guessInput.disabled) return;

    gameStates.attempCount++;
    Global.currentAttemp.textContent = attemp;

    
    if (gameStates.attempCount >= gameStates.maxAttemps && Number(attemp) !== secret_num) {
        Visuals.styleButton_endGame("newGame--lose");
        Global.feedbackMessage.textContent = `Fim de jogo! Era o número ${secret_num}`;
    }
}


export function historyAppendAttemp(attemp, cls) {
    // Evita duplicados no array de histórico
    if (gameStates.history.includes(attemp)) return;

    gameStates.history.unshift(attemp);

    // Cria o elemento visual (delegando para uma função de criação)
    const historyItem = createHistoryElement(attemp, cls);
    Global.historyList.prepend(historyItem);

    // Gerencia o limite de itens na tela
    const limit = getLimitStorage();
    if (gameStates.history.length > limit) {
        gameStates.history.pop();
        const lastChild = Global.historyList.lastElementChild;
        if (lastChild) lastChild.remove();
    }
}


function createHistoryElement(attemp, cls) {
    const historyItem = document.createElement("div");
    historyItem.className = `history__item ${cls}`;
    
    const pullAttemp = document.createElement("p");
    pullAttemp.textContent = attemp;
    
    historyItem.appendChild(pullAttemp);
    return historyItem;
}