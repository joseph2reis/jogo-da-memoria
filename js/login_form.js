const input1 = document.querySelector('.input-player1')
const input2 = document.querySelector('.input-player2')
const input3 = document.querySelector('.input-player3')
const button = document.querySelector('.login_button')
const form = document.querySelector('.login_form')

const nomesDasTribos = [];

console.log(nomesDasTribos)

const substituicoes = {
    "judá": "juda",
    "rúben": "ruben",
    "rúbem": "ruben",
    "rubem": "ruben",
    "asér": "aser"
};

const validateInput = () => {
    input1.value.length > 2 && input2.value.length > 2 ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
}

const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('player1', input1.value.toLowerCase().replace(/judá|asér|rúben|rúbem|rubem/g, (palavra) => substituicoes[palavra]));
    localStorage.setItem('player2', input2.value.toLowerCase().replace(/judá|asér|rúben|rúbem|rubem/g, (palavra) => substituicoes[palavra]));

    nomesDasTribos.push(localStorage.getItem('player1'))
    nomesDasTribos.push(localStorage.getItem('player2'))

    if (input3.value.length > 2) {
        localStorage.setItem('player3', input3.value.toLowerCase().replace(/judá|asér|rúben|rúbem|rubem/g, (palavra) => substituicoes[palavra]));
        nomesDasTribos.push(localStorage.getItem('player3'))
    } else {
        localStorage.setItem('player3', '');
    }


    getWinner();

}

const getWinner = () => {
    let interval = setInterval(() => {
        randomIndex = Math.floor(Math.random() * nomesDasTribos.length)
        localStorage.setItem('sorte', randomIndex)
        form.innerHTML = `<div class="turn1">
                <span>${nomesDasTribos[randomIndex]}</span>
                <h2>começa</h2>
            </div>`
    })

    setTimeout(() => {
        clearInterval(interval)
    }, 2000)
    setTimeout(() => {
        window.location = 'pages/game.html';
    }, 5000)

}

input1.addEventListener('input', validateInput);
input2.addEventListener('input', validateInput);
input3.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

document.addEventListener("DOMContentLoaded", () => {
    const [img, h1, input1, input2, input3, button] = document.querySelectorAll('.logo > *');
    const container = document.querySelector('.logo');

    img.classList.add("img-animation");
    h1.classList.add("title-animation");
    input1.style.display = 'none'
    input2.style.display = 'none'
    input3.style.display = 'none'
    input1.classList.add("title-animation");
    input2.classList.add("title-animation");
    input3.classList.add("title-animation");
    button.classList.add("title-animation");
    container.style.background = 'white';
    setTimeout(() => {
        img.classList.remove("grow-animation");
        h1.classList.remove("title-animation");
        input1.style.display = 'block'
        input2.style.display = 'block'
        input3.style.display = 'block'
        input1.classList.remove("title-animation");
        input2.classList.remove("title-animation");
        input3.classList.remove("title-animation");
        button.classList.remove("title-animation");
    }, 7500);

    setTimeout(() => {
        img.classList.add("jump-animation");
        button.classList.add("gradient");
    }, 9000);
})