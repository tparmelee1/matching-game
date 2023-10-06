const cards = document.querySelectorAll('.memory-card');
const replayButton = document.querySelector('.reset');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCounter = 0;
let attempts = 0;



function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first check
        hasFlippedCard = true;
        firstCard = this;
        return;
    } 
    secondCard = this;

    checkForMatch();
}        

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();
    if (isMatch === true) {
        matchCounter++;
    }
    if (isMatch === true || isMatch === false) {
        attempts++;
    }
    document.querySelector('.counter').innerHTML = matchCounter + " matched"; 
    document.querySelector('.attempts').innerHTML = attempts + " attempted";

    if (matchCounter === 6) {
        setTimeout(winAlert, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function replay() {
    location.reload();
}

replayButton.addEventListener('click', replay);

function winAlert() {
    alert("You win! It took " + attempts + " attempts and " + document.getElementById("countup").innerHTML + " on the timer!");
}


let seconds = 0;

let timer = setInterval(upTimer, 1000);

function upTimer() {
    if (attempts > 0) {
    ++seconds;
    let hour = Math.floor(seconds / 3600);
    let minute = Math.floor((seconds - hour * 3600) / 60);
    let updSecond = seconds - (hour * 3600 + minute * 60);
    document.getElementById("countup").innerHTML = hour.toLocaleString(undefined,{minimumIntegerDigits: 2}) + ":" + minute.toLocaleString(undefined,{minimumIntegerDigits: 2}) + ":" + updSecond.toLocaleString(undefined,{minimumIntegerDigits: 2});
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

//function welcome() {
//    alert("Welcome to Cat Match! Help Fried Pickles and Penelope find their mirror images. The timer will start after your first attempt. Piku and Penny are curious how fast you can complete the game!")
//}
//welcome();
//welcome message, shows up half way through loading, looks weird