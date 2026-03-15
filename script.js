const THEMES = {
animals:[
{emoji:'🐱',label:'Cat'},
{emoji:'🐶',label:'Dog'},
{emoji:'🐼',label:'Panda'},
{emoji:'🐘',label:'Elephant'},
{emoji:'🦁',label:'Lion'},
{emoji:'🦊',label:'Fox'}
],

space:[
{emoji:'🌍',label:'Earth'},
{emoji:'🌕',label:'Moon'},
{emoji:'🚀',label:'Rocket'},
{emoji:'🌌',label:'Galaxy'},
{emoji:'👨‍🚀',label:'Astronaut'},
{emoji:'🪐',label:'Saturn'}
],

food:[
{emoji:'🍕',label:'Pizza'},
{emoji:'🍔',label:'Burger'},
{emoji:'🍣',label:'Sushi'},
{emoji:'🍩',label:'Donut'},
{emoji:'🍓',label:'Strawberry'},
{emoji:'🍫',label:'Chocolate'}
],

sports:[
{emoji:'⚽',label:'Football'},
{emoji:'🏀',label:'Basketball'},
{emoji:'🎾',label:'Tennis'},
{emoji:'⚾',label:'Baseball'},
{emoji:'🏐',label:'Volleyball'},
{emoji:'🏓',label:'Ping Pong'}
]
};

const DIFFICULTIES={
easy:{cols:4,pairs:6},
medium:{cols:4,pairs:8},
hard:{cols:6,pairs:12}
};

let selectedDiff='easy';
let selectedTheme='animals';

let firstCard=null;
let secondCard=null;
let lockBoard=false;

let moves=0;
let matchedPairs=0;
let totalPairs=0;

const gameBoard=document.getElementById('gameBoard');
const moveCount=document.getElementById('moveCount');
const pairCount=document.getElementById('pairCount');

document.getElementById('startBtn').addEventListener('click',startGame);

function startGame(){
buildBoard();
}

function buildBoard(){

const {cols,pairs}=DIFFICULTIES[selectedDiff];
totalPairs=pairs;

const pool=[...THEMES[selectedTheme]].slice(0,pairs);
const cards=[...pool,...pool].sort(()=>Math.random()-0.5);

gameBoard.style.gridTemplateColumns=`repeat(${cols},auto)`;
gameBoard.innerHTML='';

cards.forEach(item=>{

const card=document.createElement('div');
card.classList.add('card');
card.dataset.value=item.label;

card.innerHTML=`
<div class="card-inner">
<div class="card-face card-back-face"></div>
<div class="card-face card-front-face">
<div class="card-emoji-big">${item.emoji}</div>
<div class="card-label">${item.label}</div>
</div>
</div>
`;

card.addEventListener('click',()=>onCardClick(card));

gameBoard.appendChild(card);

});

}

function onCardClick(card){

if(lockBoard||card===firstCard||card.classList.contains('matched')) return;

card.classList.add('flipped');

if(!firstCard){
firstCard=card;
return;
}

secondCard=card;
lockBoard=true;
moves++;
moveCount.textContent=moves;

if(firstCard.dataset.value===secondCard.dataset.value){

firstCard.classList.add('matched');
secondCard.classList.add('matched');

matchedPairs++;
pairCount.textContent=`${matchedPairs}/${totalPairs}`;

resetBoard();

}else{

setTimeout(()=>{
firstCard.classList.remove('flipped');
secondCard.classList.remove('flipped');
resetBoard();
},800);

}

}

function resetBoard(){
[firstCard,secondCard,lockBoard]=[null,null,false];
}