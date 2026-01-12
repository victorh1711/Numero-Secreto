const label = document.getElementById('number-label');
const input = document.getElementById('number-input');
const message = document.getElementById('message');
const button = document.getElementById('guess-button');

function setSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
let secretNumber = setSecretNumber();



window.addEventListener('load', () => {
    if (sessionStorage.getItem('newGame') === 'true') {
        message.style.display = 'none';
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
            message.style.display = 'block';
            message.textContent = 'Digite algo';
            message.style.color = 'rgb(201, 46, 11)';

        }
        else if (userGuess < 1 || userGuess > 100) {
            message.style.display = 'block';
            message.textContent = 'O número deve estar entre 1 e 100';
            message.style.color = 'rgb(201, 46, 11)';
        
        }
        else if (userGuess < secretNumber) {
            message.style.display = 'block';
            message.textContent = 'tente um número maior';
            message.style.color = 'rgb(255, 140, 0)';

        }
        else if (userGuess > secretNumber) {
            message.style.display = 'block';
            message.textContent = 'tente um número menor';
            message.style.color = 'rgb(255, 140, 0)';

        }
        else if (userGuess == secretNumber) {
            message.style.display = 'block'
            message.textContent = 'Parabéns! Você acertou!';
            message.style.color = 'rgb(0, 128, 0)';
            button.classList.remove('guess-button');
            button.classList.add('new-game-button');
            button.textContent = 'Novo Jogo?';
            input.setAttribute('disabled', 'true');

        }
        if (userGuess != secretNumber) {
            setTimeout(() => {
                message.style.display = 'none';
                message.textContent = '';
                message.style.color = '';
            }, 1500);
        }
} 
});


window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && button.textContent === 'Adivinhar') {
        e.preventDefault();
        button.click();
    }
});