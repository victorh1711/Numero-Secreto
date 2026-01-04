const button = document.getElementById('guess-button');
const input = document.getElementById('number-input');
const label = document.getElementById('number-label');
const message = document.getElementById('message');
function setSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
let secretNumber = setSecretNumber();


window.addEventListener('load', () => {
    if (sessionStorage.getItem('newGame') === 'true') {
        label.textContent = 'Denovo!';
        message.style.color = 'rgb(0, 128, 0)';
        sessionStorage.removeItem('newGame');

        setTimeout(() => {
            message.textContent = '';
        }, 2000);
    }
});


button.addEventListener('click', ()=> {
    if(button.textContent === 'Novo Jogo?') {
        sessionStorage.setItem('newGame', 'true');
        location.reload();
        return;
    }
    
    else {

            const userGuess = input.value.trim();
        if (userGuess == '') {
            message.textContent = 'Digite algo';
            message.style.color = 'rgb(201, 46, 11)';

        }
        else if (userGuess < 1 || userGuess > 100) {
            message.textContent = 'O número deve estar entre 1 e 100';
            message.style.color = 'rgb(201, 46, 11)';
        
        }
        else if (userGuess < secretNumber) {
            message.textContent = 'tente um número maior';
            message.style.color = 'rgb(255, 140, 0)';

        }
        else if (userGuess > secretNumber) {
            message.textContent = 'tente um número menor';
            message.style.color = 'rgb(255, 140, 0)';

        }
        else if (userGuess == secretNumber) {
            message.textContent = 'Parabéns! Você acertou!';
            message.style.color = 'rgb(0, 128, 0)';
            button.classList.remove('guess-button');
            button.classList.add('new-game-button');
            button.textContent = 'Novo Jogo?';

        }
        if (userGuess != secretNumber) {
            setTimeout(() => {
                message.textContent = '';
                message.style.color = '';
            }, 1500);
        }
}
    
})