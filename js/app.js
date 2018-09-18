
// display cards
var iconsArray = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
var iconsTypes = ["diamond", "plane", "anchor", "bolt", "cube", "anchor", "leaf", "bicycle", "diamond", "bomb", "leaf", "bomb", "bolt", "bicycle", "plane", "cube"];
var numOfIcons = iconsArray.length;
function showAllCards(){
    var output = '',i;
    for(i=0;i<numOfIcons;i++){
        output += '<li class="card" type="'+iconsTypes[i]+'"><i class="fa '+iconsArray[i]+'"></i></li>'
    }
    document.getElementById('card-deck').innerHTML = output;
}
showAllCards();


// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let cardClick = 0;
let counter = document.querySelector(".moves");


// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");


// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("ResultPopup")

// array for opened cards
var openedCards = [];

/**
* This shuffles function require param `array` and returns `shuffledarray`
*
* @description shuffles cards
* @param {array}
* @returns shuffledarray
**/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};


/** @description shuffles cards when page is refreshed / loads **/
document.body.onload = startGame();



/** @description function to start a new play **/
function startGame(){

    // shuffle all card in deck 
    cards = shuffle(cards);

    // Set the click count to 0 
    cardClick = 0;

    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0<span class='small'>m</span> 0<span class='small'>s</span>";
    clearInterval(interval);
}


/** @description toggles open and show class to display cards **/
var displayCard = function (){
    cardClick++;
    
    //start timer on first click
    if(cardClick == 1){
        second = 1;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


/** @description add opened cards to OpenedCards list and check if cards are match or not **/
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


/** @description when cards match **/
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


/** @description when cards don't match **/
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },700);
}


/** @description disable cards temporarily **/
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


/** @description enable cards and disable matched cards **/
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


/** @description count player's moves **/
var starN = '';
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves<=15){
        starN = "<li><i class='fa fa-star final'></i></li><li><i class='fa fa-star final'></i></li><li><i class='fa fa-star final'></i></li>";
    }else if(moves>=16 && moves<=20){
        starN = "<li><i class='fa fa-star final'></i></li><li><i class='fa fa-star final'></i></li><li><i class='fa fa-star'></i></li>";
    }else{
        starN = "<li><i class='fa fa-star final'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
    }

    document.getElementById("stars").innerHTML = starN;

}

/** @description game timer **/
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"<span class='small'>m</span> "+second+"<span class='small'>s</span>";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


/** @description congratulations when all cards match, show modal and moves, time and rating **/
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starN;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


/** @description close icon on modal **/
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        document.querySelector(".stars").innerHTML = "<li><i class='fa fa-star final'></i></li><li><i class='fa fa-star final'></i></li><li><i class='fa fa-star final'></i></li>";
        startGame();
    });
}


/** @desciption for user to play Again **/
function playAgain(){
    modal.classList.remove("show");
    document.querySelector(".stars").innerHTML = "<li><i class='fa fa-star final'></i></li><li><i class='fa fa-star final'></i></li><li><i class='fa fa-star final'></i></li>";
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
