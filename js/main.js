// ----------------- functions ------------------

// detect user keystrokes.
// if user types correct key, play a typing sound effect and animate the letter white.
// if user types incorrect key, play an error sound effect and make letter red.
document.onkeypress = function(e){
    if(begin) {
        charsTyped++;
        let input = e.keyCode;
        let match = test.charCodeAt(currChar);
        if(input === match) {
            console.log('match');
            document.getElementsByClassName(`char${currChar+1}`).item(0).classList.remove("wrong");
            document.getElementsByClassName(`char${currChar+1}`).item(0).classList.add("animate");
            correct.play();
            currChar++;
        } else {
            console.log('wrong');
            document.getElementsByClassName(`char${currChar+1}`).item(0).classList.add("wrong");
            mistakeCount++;
            incorrect.play();
        }
        calcStats();
    }
};

// calculate Words Per Minute and Accuracy
// update those 2 stats as well as Mistakes to their DOM elements.
function calcStats() {
    let wpmValue = Math.round(((charsTyped/5)) / (seconds/60));
    if(wpmValue > 10 & wpmValue < 150) {
        wpm.textContent = wpmValue;
    }
    let accuracyValue = Math.round(charsTyped-mistakeCount)/charsTyped;
    if(accuracyValue === 1) {
        accuracyValue = 1;
    }
    accuracyValue = Math.round(100*accuracyValue);
    accuracy.textContent = accuracyValue;
    mistakes.textContent = mistakeCount;
}

// interval timer for one second.
// update the text on timer.
function countSecond() {
    seconds++;
    if(seconds <= 50) {
        timer.textContent = "0:" + (60-seconds);
    } else if(seconds < 60) {
        timer.textContent = "0:0" + (60-seconds);
    } else {
        restart = true;
        timer.textContent = "Restart"
    }
}

// if test hasn't begun, this button begins two timers-- 1s and 60s.
// also initializes the timer text to 1:00.
function beginTest() {
    if(restart === true) {
        location.reload();
        //timer.textContent = "1:00";
        //seconds = 0;
        // need to remove class="wrong" from all elements in #sentence
        //setTimeout(stopTest, 60000);
    }
    if(begin === false) {
        setTimeout(stopTest, 60000);
        setInterval(countSecond, 1000);
        timer.textContent = "1:00";
    }
    begin = true;
}

// just a boolean that makes it possible to make the
// start button un-clickable by user after test has begun.
function stopTest() {
    begin = false;
}

// places the typing test text into the DOM element
function init() {
    onScreen.textContent = '';
    for(let i=0; i<onScreenLength; i++) {
        onScreen.textContent += test[i];
    }
}

// once document is ready, use lettering.js (jQuery plugin)
// to place each character in the typing test text in it's
// own span element. this is how individual characters 
// can change color or be animated.
$(document).ready(function() {
    $(".fancy").lettering();
  });

// --------------------- main script --------------------

// load sound FX
var chime = new Audio('./sounds/chime.wav');
var correct = new Audio('./sounds/correct.wav');
correct.volume = 0.6;
var incorrect = new Audio('./sounds/incorrect.wav');
incorrect.volume = 0.6;

// grab DOM elements
let onScreen = document.getElementById('sentence');
let wpm = document.getElementById('wpm');
let accuracy = document.getElementById('accuracy');
let mistakes = document.getElementById('mistakes');
let timer = document.getElementById('timer');

// text for typing test
let test = "Jim and Anne will be in charge of the spring field day to be held in early June. They will ask their friends' aid to get set up. There will be games for the boys and girls. The children will want to hike, ride their bikes, and swim. This yearly event will be held in the new Peach Grove Park. Ruth has work to do on the plans for food for the day. Last year Ruth spent most of her time helping the two cooks with many snacks. Hot dogs, fries, soft drinks, ice cream, and candy apples were big sellers. Apple pie and ice cream sold well too. I hope Ruth serves the same food this year. George Long will hire the band and singer for the day. A great jazz band will play. George's mom leads the group. The jazz band is sure to be one of the big hits. George is to have them play from one to four and also in the evening. The fine songs they will play are sure to please all of us. Nice gifts will be given to all of the winners in each of the events. Local news coverage will include television and newspapers. Joyce Scott will take care of the pictures for the school paper and yearbook. Maybe the national news will do a short story on the tenth annual spring field day. The jazz band is sure to be one of the big hits. George is to have them play from one to four and also in the evening. The fine songs they will play are sure to please all of us."

let onScreenLength = 747;
let currChar = 0;
let seconds = 0;
init();
let begin = false;
let restart = false;
let charsTyped = 0;
let mistakeCount = 0;