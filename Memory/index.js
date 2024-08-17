const srcs = [
    'imgs/caveira1.svg',
    'imgs/caveira2.svg',
    'imgs/caveira3.svg',
    'imgs/caveira4.svg',
    'imgs/caveira5.svg',
    'imgs/caveira6.svg'
];

const back_image = "imgs/back.svg";
const cards = [];
srcs.forEach((src, index) => {
    cards.push({ src, brother: index + 1 });
    cards.push({ src, brother: index + 1 });
});

let table = document.getElementById("cards");
let table_overlay = document.getElementById("overlay");

function setSortedCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

const sortedCards = setSortedCards(cards);

function insertCard(line, overlay_line, card) {
    const cell = line.insertCell();
    cell.innerHTML = `<img class="card" id="card${card.brother}" src="${card.src}" data-brother="${card.brother}">`;
    const overlayCell = overlay_line.insertCell();
    overlayCell.innerHTML = `<img class="backcard" id="backcard${card.brother}" src="${back_image}" data-brother="${card.brother}">`;
}

let line, overlay_line;
for (let i = 0; i < sortedCards.length; i++) {
    if (i % 4 === 0) {
        line = table.insertRow();
        overlay_line = table_overlay.insertRow();
    }
    insertCard(line, overlay_line, sortedCards[i]);
}

const readyOverlayCards = document.querySelectorAll(".backcard");
let pos1 = null;
let pos2 = null;
let lockBoard = false;
let corrects = 6;

winScreem = document.querySelector(".win");

readyOverlayCards.forEach(card => {
    card.addEventListener('click', () => {
        if (lockBoard || card.classList.contains('show')) return;

        card.classList.add("show");

        if (pos1 === null) {
            pos1 = card;
        } else if (pos2 === null) {
            pos2 = card;
            lockBoard = true;

            if (pos1.dataset.brother === pos2.dataset.brother) {
                pos1 = null;
                pos2 = null;
                lockBoard = false;
                corrects --;

                if(corrects === 0){
                    winScreem.classList.add("victory");
                }
                
            } else {
                setTimeout(() => {
                    pos1.classList.remove("show");
                    pos2.classList.remove("show");
                    pos1 = null;
                    pos2 = null;
                    lockBoard = false;
                }, 1000);
            }
        }
    });
});

reload = document.querySelector(".reloadButton");

reload.addEventListener('click', () => {
    location.reload();
});

