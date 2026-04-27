import * as Global from './index.js'
import * as Visuals from './visuals.js'


export function validateGuess(attemp) {
    const secret = Global.secret_num;
    const msg = Global.feedbackMessage;
    const attempNum = Number(attemp.trim());
    const diff = Math.abs(secret - attempNum);


    if (attemp.trim() === "") {
        Visuals.shakeInput()
        msg.className = "controls__message"
        return msg.textContent = "Digite algo...";
    }
    

    if(attempNum > 100 || attempNum < 0){
        Visuals.shakeInput()
        msg.className = "controls__message"
        return msg.textContent = "Número inválido...";
    }


    if (attempNum === 0) {
        Visuals.shakeInput()
        msg.className = "controls__message"
        return msg.textContent = "0 é inválido...";
    }


    if (attempNum === secret) {
        Global.winGame()
        Visuals.setStateMessage("is-correct")
        Visuals.setArcState("is-correct")

        Global.pullCurrentAttemp(attemp)
        return msg.textContent = "Correto!";
    }

   
    if (diff < 5) {
        Visuals.triggerHit(Global.arcWrapper)
        Visuals.setStateMessage("is-so-near")
        Visuals.setArcState("is-near")

        Global.pullCurrentAttemp(attemp)
        Global.appendGuess(attemp, "is-so-near")
        return msg.textContent = "Muito perto...";
    } 


    if (diff < 15) {
        Visuals.triggerHit(Global.arcWrapper)
        Visuals.setStateMessage("is-near")
        Visuals.setArcState("is-near")

        Global.pullCurrentAttemp(attemp)
        Global.appendGuess(attemp, "is-near")
        return msg.textContent = "Quase lá...";
    }


    if (attempNum < secret) {
        Visuals.triggerHit(Global.arcWrapper)
        Visuals.setStateMessage("is-low");
        Visuals.setArcState("is-low")

        Global.pullCurrentAttemp(attemp)
        Global.appendGuess(attemp, "is-low")
        return msg.textContent = "O número secreto é maior...";
    }
    else {
        Visuals.triggerHit(Global.arcWrapper)
        Visuals.setArcState("is-high")
        Visuals.setStateMessage("is-high");

        Global.appendGuess(attemp, "is-high")
        Global.pullCurrentAttemp(attemp)
        return msg.textContent = "O número secreto é menor...";
    } 

}
