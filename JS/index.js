import * as Val from './validate-attemp.js';
import * as Visuals from './visuals.js';
import * as Game from './game.js';

// --- Seleção de Elementos ---
export const arc = document.getElementById("arc");
export const arcWrapper = document.getElementById("arcWrapper");
export const currentAttemp = document.getElementById("currentAttemp");
export const historyContainer = document.getElementById("historyContainer");
export const historyList = document.getElementById("historyList");
export const guessInput = document.getElementById("guessInput");
export const submitButton = document.getElementById("submitButton");
export const leftTries = document.getElementById("leftTries")
export const feedbackMessage = document.getElementById("feedbackMessage");

// --- Estado Global ---
export const limit_storage = Game.getLimitStorage();
export const childs = [];

// --- Inicialização de Eventos ---
function initEvents() {
    
    // Mostra/Esconde histórico
    guessInput.addEventListener("focus", () => Visuals.showHide_History(true));
    
    // O foco sai do input
    guessInput.addEventListener("blur", () => {
        // Pequeno delay para permitir cliques em elementos do histórico, se necessário
        setTimeout(() => Visuals.showHide_History(false), 150);
    });

    // Lógica do Clique Principal
    submitButton.addEventListener("click", () => {
        if (guessInput.disabled) {
            location.reload();
            return;
        }
    
        const attemp = guessInput.value;
        
        // Armazenamos o resultado da validação
        const isValid = Val.validateGuess(attemp);
    
        // SÓ executamos a lógica do jogo se for válido
        if (isValid) {
            Game.addAttemp(attemp);
            Game.updateTries()
            guessInput.value = "";
        }
    });

    // Atalho Enter
    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitButton.click();
        }
    });
}

// Inicia o app
initEvents();