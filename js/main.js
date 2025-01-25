const containerCard = document.querySelector('.container-card');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const player3 = document.querySelector('.player3');
const time = document.querySelector('.time');
const turnTribo = document.querySelector('.turn-tribo');
const winner = document.querySelector('.winner');
const playersName1 = localStorage.getItem('player1');
const playersName2 = localStorage.getItem('player2');
const playersName3 = localStorage.getItem('player3');
const winnerImg = document.querySelector('.winner-img');
const player3Container = document.querySelector('.player3-container');

const scores = [
    document.querySelector('.score1'),
    document.querySelector('.score2'),
    document.querySelector('.score3')
];

let playerNames = [playersName1, playersName2];
let playerTurn = 0;
let scoresArray = [0, 0, 0];
let timer = 30;
let timerInterval;
let isPaused = false;

const btnExit = document.querySelector(".exit");

const pl = document.querySelectorAll('#player1')

// sons
const flipSound = new Audio('../audio/flip.mp3');
const matchSound = new Audio('../audio/match.mp3');

btnExit.addEventListener("click", () => {
    window.location = "https://joseph2reis.github.io/jogo-da-memoria"
})

const projetos = [
    'arcanjos',
    'assistente',
    'atalaia',
    'cultura',
    'esporte',
    'helpe',
    'midia',
    'uniforca',
]

const numeros = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


const createCard = (projeto, numero) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    const number = createElement('span', 'number');
    const number2 = createElement('span', 'number2');

    front.style.backgroundImage = `url('../assets/${projeto}.png')`;
    number.innerHTML = numero + 1

    card.appendChild(front);
    card.appendChild(back);
    back.appendChild(number);
    back.appendChild(number2);
    card.addEventListener('click', () => revealCard(card));
    card.setAttribute('data-projeto', projeto)

    return card;
}

let firstCard = '';
let secondCard = '';

const resetCardValue = () => {
    firstCard = '';
    secondCard = '';
}


const isGameOver = () => {

    const disabledCards = document.querySelectorAll('.animation-correct-cards')

    if (disabledCards.length === 16) {
        clearInterval(timerInterval);
        declareWinner()

    }
}

// Função para atualizar as pontuações na tela
function updateScores() {
    scores.forEach((scoreElement, index) => {
        scoreElement.textContent = scoresArray[index];
    });
}

// Função para trocar para o próximo jogador
const nextPlayer = () => {
    playerTurn = (playerTurn + 1) % playerNames.length;
    turnTribo.textContent = playerNames[playerTurn]
    startTurnTimer();
}

// Função para iniciar o cronômetro do turno
function startTurnTimer() {
    clearInterval(timerInterval);
    timer = 30;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        if (!isPaused) {
            timer--;
            updateTimerDisplay();
            if (timer <= 0) {
                clearInterval(timerInterval);
                nextPlayer();
            }
        }
    }, 1000);
}

// Atualizar o cronômetro na tela
function updateTimerDisplay() {
    time.textContent = `${timer}s`;
}

// Função para declarar o vencedor
function declareWinner() {
    clearInterval(timerInterval);
    let img = 'trofeu';
    const maxScore = Math.max(...scoresArray);
    const winners = playerNames.filter(
        (_, index) => scoresArray[index] === maxScore
    );

    if (winners.length > 1) {
        winnerImg.src = "../assets/7650331.png";
    } else if (winners == 'juda' || winners == 'aser' || winners == 'ruben') {
        winnerImg.src = `../assets/${winners[0]}.jpg`;
    } else {
        winnerImg.src = `../assets/trofeu.jpg`;
    }



    winner.classList.remove('hidden');
    winner.firstElementChild.firstElementChild.textContent =
        winners.length > 1
            ? `Empate entre: ${winners.join(' e ')}`
            : `O vencedor é: ${winners[0]}!`;


}


const checkCards = (firstCard, secondCard) => {

    if (firstCard.getAttribute('data-projeto') === secondCard.getAttribute('data-projeto')) {

        firstCard.firstChild.classList.add('animation-correct-cards')
        secondCard.firstChild.classList.add('animation-correct-cards')
        matchSound.play();
        scoresArray[playerTurn] += 10;
        startTurnTimer();
        updateScores();

        setTimeout(() => {
            resetCardValue();
            isGameOver();
        }, 1000);


    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            flipSound.play();
            nextPlayer();
            resetCardValue();
        }, 800);
    }
}

const revealCard = (card) => {

    if (card.className.includes('reveal-card')) return;

    if (firstCard === '') {
        card.classList.add('reveal-card')
        flipSound.play();
        firstCard = card

    } else if (secondCard === '') {
        card.classList.add('reveal-card')
        flipSound.play();
        secondCard = card
        checkCards(firstCard, secondCard);
    }

}

const loadGame = () => {

    player1.innerHTML = playersName1.toUpperCase();
    player2.innerHTML = playersName2.toUpperCase();

    if (playersName3) {
        playerNames.push(playersName3);
        player3.innerHTML = playersName3.toUpperCase();
    } else {
        // Esconde o elemento do player 3 se não existir
        player3Container.style.display = 'none';
    }
 
    playerTurn = parseInt(localStorage.getItem('sorte'));
    turnTribo.innerHTML = playerNames[playerTurn];


    copiaProjetos = [...projetos, ...projetos];
    containerCard.classList.add("appear-cards");
    const ramdoCards = copiaProjetos.sort();
    // () => Math.random() - 0.5
    ramdoCards.forEach((projeto, numero) => {
        const card = createCard(projeto, numero);
        containerCard.appendChild(card)
    });

}

window.onload = () => {
    startTurnTimer();
    loadGame();
}

