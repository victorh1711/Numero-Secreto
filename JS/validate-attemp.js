import * as Global from './index.js'
import * as Visuals from './visuals.js'
import * as Game from './game.js'

export function validateGuess(attemp) {
    const secret = Game.secret_num;
    const msg = Global.feedbackMessage;
    const attempNum = Number(attemp.trim());
    const diff = Math.abs(secret - attempNum);

    // --- 1. Validações de Erro (Input Inválido) ---
    if (attemp.trim() === "" || isNaN(attempNum) || attempNum <= 0 || attempNum > 100) {
        Visuals.shakeInput();
        msg.className = "controls__message";
        
        if (attemp.trim() === "") msg.textContent = "Digite algo...";
        else if (attempNum === 0) msg.textContent = "0 é inválido...";
        else msg.textContent = "Número inválido (1-100)...";

        return false
    }

    // --- 2. Lógica de Acerto ---
    if (attempNum === secret) {
        Visuals.styleButton_endGame("newGame--win");
        Visuals.setStateMessage("is-correct");
        Visuals.setArcState("is-correct");
        Game.pullCurrentAttemp(attemp);
        return msg.textContent = "Correto!";
    }

    // --- 3. Lógica de Erro (Palpites Próximos ou Longe) ---
    // Atalhos para evitar repetição excessiva de código visual
    Visuals.triggerHit(Global.arcWrapper);

    let state = "";
    let feedback = "";

    if (diff < 5) {
        state = "is-so-near";
        feedback = "Muito perto...";
        Visuals.setArcState("is-near"); // Mantém o estado visual do arco
    } 
    else if (diff < 15) {
        state = "is-near";
        feedback = "Quase lá...";
        Visuals.setArcState("is-near");
    } 
    else if (attempNum < secret) {
        state = "is-low";
        feedback = "O número secreto é maior...";
        Visuals.setArcState("is-low");
    } 
    else {
        state = "is-high";
        feedback = "O número secreto é menor...";
        Visuals.setArcState("is-high");
    }

    // Executa as ações comuns para erros de palpite
    Visuals.setStateMessage(state);
    Game.historyAppendAttemp(attemp, state);
    msg.textContent = feedback;
    return true
}