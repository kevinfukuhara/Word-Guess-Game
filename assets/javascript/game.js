// ------------------------------
//   CREATE GLOBAL VARIABLES
//-----------------------------
//var answers = ["smash ball", "ganondorf", "link", "mario", "pikachu", "luigi", "kirby", "jigglypuff", "donkey kong", "bowser", "king k rool", "hyrule", "corneria", "mushroom kingdom", "pokemon stadium", "ness", "lucas", "marth", "roy", "ken", "ryu", "little mac", "jungle japes", "olimar", "wii fit trainer", "megaman", "incineroar", "fox", "captain falcon", "snake", "young link", "villager", "lucina", "king dedede", "sonic", "dark pit", "duck hunt", "inkling", "pokeball", "assist trophy", "golden hammer", "party ball", "masahiro sakurai", "nintendo", "peach", "master hand", "crazy hand", "lucario", "simon", "bayonetta", "yoshi", "samus", "dark samus", "pirahna plant"];

var answers = ["link", "dark pit", "wii fit trainer"];

// var answers = ["k", "kl"];

var goalAnswer;
var unguessedWord = [];
var guessedArray = [];
var winCount = 0;
var lossCount = 0;
var allowedGuesses = 5;
var guessesLeft = allowedGuesses;
var newWordNeeded = true;           // Only true if: onLoad  of Game, allowedGuesses = 0, or unguessedWord.includes("_" === false)
var legalGuess = /^[a-z]+$/;

// Variables linking the JS items to the HTML DocumentID objects.
var unguessedWordText = document.getElementById("unguessedWord-text");
var guessesText = document.getElementById("guesses-text");
var guessesLeftText = document.getElementById("guessesLeft-text");
var winCountText = document.getElementById("winCount-text");
var lossCountText = document.getElementById("lossCount-text");

// Variables used for Auditory Add-Ons:
//  Background Music
var backgroundMusic;
var battlefieldArray = ["battlefieldThemeSong","finalDestSong"];
var battlefieldStageNum = -1;
var marioArray = ["throwbackMarioSong","marioGustyGalaxySong","yoshiIslandSong","luigiMansionSong"];
var marioStageNum = -1;
var hyruleArray = ["legendOfZeldaThemeSong","hyruleMainSong","gerudoValleySong"];
var hyruleStageNum = -1;
var pokemonArray = ["pokemonMainSong","pokemonCenterSong","pokemonBattleDPSong","pokemonBattleRSSong","pokemonGymRBSong"];
var pokemonStageNum = -1;
var wiiStudioArray = ["wiiFitMenuSong","miiChannelSong"];
var wiiStudioStageNum = -1;
var wilyStageSong = "megamanSong";
// var wilyCastArray = ["","","","",""]; - Not needed bc 1 song only.*/

//  Sound Effects
var correctSnd = document.getElementById("correctSndText");
var incorrectSnd = document.getElementById("incorrectSndText");
var roundWinSnd = document.getElementById("roundWinSndText");
var roundLossSnd = document.getElementById("roundLossSndText");
var gameWinSongSnd = document.getElementById("gameWinSongSndText");
var gameLostSongSnd = document.getElementById("gameLostSongSndText");
var congratsSnd = document.getElementById("congratsSndText");
var defeatSnd = document.getElementById("defeatSndText");
var continueSnd = document.getElementById("continueSndText");


// -------------------------------
// FUNCTIONS
// -------------------------------

// fucntion used to generate a new goal word + create the unguessedWord array.
function generateWord() {
    // Use random number generation to select a goal word for goalAnswer from answers array
    console.log("Generating a new word: ");
    var randNum = Math.floor((Math.random() * answers.length));
    console.log(randNum);
    console.log(answers[randNum]);
    goalAnswer = answers[randNum];
    console.log(goalAnswer);
    console.log("goalAnswer.length: " + goalAnswer.length);

    //iterate through goalAnswer to generate the array of "_" where non-space-bar characters are - push them into unguessedWord array.
    for (i = 0; i < goalAnswer.length; i++) {
        var character = goalAnswer.charAt(i);
        if (character == "\ ") {
            unguessedWord.push("-");
        } else {
            unguessedWord.push("_");
        }
        console.log(unguessedWord.join(" "));
    }
    // set newWordNeeded to false - Tell the game that a new word is not needed anymore
    newWordNeeded = false;
}

// function to reset a round 
//  Will reset the 'guessedArray' and 'guessesLeft' variables
// USES:
//      generateWord();    
function newRound() {
    dividers(1);
    console.log("Starting a new round please see process below:");
    unguessedWord = [];
    guessedArray = [];
    guessesLeft = allowedGuesses;
    generateWord();
    
    // update the arrays
    unguessedWordText.textContent = unguessedWord.join(" ");
    guessesText.textContent = guessedArray.join(", ");
    guessesLeftText.textContent = guessesLeft;
    dividers(1);
} 

// function to start a new game
// Will reset the 'winCount' variable    
// USES:
//      generateWord();
//      newRound();
function newGame() {
    winCount = 0;
    lossCount = 0;
    battlefieldStageNum = -1;
    marioStageNum = -1;
    hyruleStageNum = -1;
    pokemonStageNum = -1;
    wiiStudioStageNum = -1;
    newRound();
    winCountText.textContent = winCount;
    lossCountText.textContent = lossCount;

    dividers(9);
    console.log("New Game Started!");
}

// fucntion to show me all the values stored in global variables
function showAll() {
    console.log(goalAnswer);
    console.log(unguessedWord);
    console.log(guessedArray);
    console.log(winCount);
    console.log(lossCount);
    console.log(allowedGuesses);
    console.log(guessesLeft);
    console.log(newWordNeeded);
}

// fucntion to give break dividers
function dividers(num) {
    for (k = 0; k < num; k++) {
        console.log("----------------------------");
    }
}

//-------------------------------
//      AESTHETIC FUNCTIONS
//-------------------------------

// fucntion to play background music
function changeBackgroundMusic(stage) {
    // pause any music playing
    if (backgroundMusic != null) {
        backgroundMusic.pause();
    }
    
    // Song Selection Family is selected based on parameter
    // song select number are the *StageNum's - need to incremented then checked to ensure not over the array size
    if (stage == "battlefield"){
        battlefieldStageNum++;
        if (battlefieldStageNum == battlefieldArray.length) {
            battlefieldStageNum = 0;
        }
        backgroundMusic = document.getElementById(battlefieldArray[battlefieldStageNum]);
        backgroundMusic.volume = (0.4);
    } else if (stage == "marioStage") {
        marioStageNum++;
        if (marioStageNum == marioArray.length) {
            marioStageNum = 0;
        }
        backgroundMusic = document.getElementById(marioArray[marioStageNum]);
        backgroundMusic.volume = (0.4);
    }  else if (stage == "zeldaStage") {
        hyruleStageNum++;
        if (hyruleStageNum == hyruleArray.length) {
            hyruleStageNum = 0;
        }
        backgroundMusic = document.getElementById(hyruleArray[hyruleStageNum]);
        backgroundMusic.volume = (0.4);
    }  else if (stage == "pokemonStage") {
        pokemonStageNum++;
        if (pokemonStageNum == pokemonArray.length) {
            pokemonStageNum = 0;
        }
        backgroundMusic = document.getElementById(pokemonArray[pokemonStageNum]);
        backgroundMusic.volume = (0.4);
    }  else if (stage == "wiiStudioStage") {
        wiiStudioStageNum++;
        if (wiiStudioStageNum == wiiStudioArray.length) {
            wiiStudioStageNum = 0;
        }
        backgroundMusic = document.getElementById(wiiStudioArray[wiiStudioStageNum]);
        backgroundMusic.volume = (0.4);
    }   else if (stage == "wilyStage") {
        backgroundMusic = document.getElementById(wilyStageSong);
        backgroundMusic.volume = (0.4);
    }   
    backgroundMusic.play();
} 

// to pause background music
function pauseMusic() {
    backgroundMusic.pause();
}

// functions for sound effects
function playCorrectSnd() {
    // debugger;
    // Play the sound of a correct Guess
    setTimeout(() => {
        correctSnd.play();
    }, 0);
}

function playIncorrectSnd() {
    // Play the sound of an incorrect Guess
    setTimeout(() => {
        incorrectSnd.play();
    }, 0);
}

function playRoundWin() {
    // Play the upgrade/round win sound
    setTimeout(() => {
        roundWinSnd.play();
    }, 800);
}

function playRoundLoss() {
    // Play the upgrade/round LOSS sound
    setTimeout(() => {
        roundLossSnd.play();
    }, 700);
}

function playGameWin() {
    //Stop Background music if there is any
    if (backgroundMusic != null) {
        backgroundMusic.pause();
    }
    // Play congrats sound + song
    setTimeout(() => {
        congratsSnd.play();
    }, 2400);
    setTimeout(() => {
        gameWinSongSnd.play();
    }, 4900);
}

function playGameLost() {
    //Stop Background music if there is any
    if (backgroundMusic != null) {
        backgroundMusic.pause();
    }
    // play defeat + losing life song
    setTimeout(() => {
        defeatSnd.play();
    }, 2000);
    setTimeout(() => {
        gameLostSongSnd.play();
    }, 2700);
}

function continueScreen() {
    // Played after the winning or losing life functions
    setTimeout(() => {
        continueSnd.play();
    }, 0);
    
    setTimeout(() => {
        var playAgain = confirm("Continue and play again?");
        if (playAgain) {
            newGame();
        } else {
            alert("Thanks for playing! \n You may close the window now!");
        }
    }, 2250);
}


//------------------------------------
//----------------------------------
// -------------------------------
//         GAME SETUP
// -------------------------------
//----------------------------------
newGame();


// -------------------------------
//        GAME BEGINS!
// -------------------------------

// Begin to run JS on keyPress
document.onkeyup = function(pressEvent) {
    //Check if letter pressed is a legal char between 'a' - 'z'
    var letterGuess = pressEvent.key;
    console.log(letterGuess);

    // if (letterGuess >= 'a' || letterGuess <= 'z') {
    if (letterGuess.match(legalGuess)) {
        console.log("valid");
        
        // check if letterGuess has already been guessed by user!
        //      if so: continue - see if 'letterGuess' is in the 'goalAnswer' 
        //      else: skipe
        if(!(guessedArray.includes(letterGuess))) {
            // check if goalAnswer contains the char in letterGuess
            //      if so: modify Guessed word array
            //      else: decrement guessesLeft
            if (goalAnswer.includes(letterGuess)) {
                console.log("correct guess!");
                //iterate through goalAnswer to see which letters match the guessedLetter
                for (j = 0; j < goalAnswer.length; j++) {
                    //check if letter in string match the guessed letter
                    //      if so: replace "_" in unguessedWord array with the letterGuess
                    //      else: do nothing and continue on
                    if (goalAnswer.charAt(j) === letterGuess) {
                        unguessedWord[j] = letterGuess;
                        console.log("put " + letterGuess + " into unguessedWord array at index " + j);
                    }
                }
                playCorrectSnd();
            } else {
                console.log("incorrect guess...");
                guessesLeft--;

                playIncorrectSnd();
            }
        }
        else {
            console.log("You've already typed this before! - Choose another.")
        }
        //add guessed letter to guessedArray
        guessedArray.push(letterGuess);
        console.log("Lastly, put " + letterGuess + " into guessedArray array");        
    }

    // update and show the following variables in HTML Doc
    //      unguessedWord
    //      guessedArray
    //      guessesLeft    
    unguessedWordText.textContent = unguessedWord.join(" ");
    guessesText.textContent = guessedArray.join(", ");
    guessesLeftText.textContent = guessesLeft;


    // Check if user needs new word: i.e. won or lost
    if (!(unguessedWord.includes("_"))) {
        //win scenario
        winCount++;
        console.log("ROUND WIN");
        // update and show the following variables in HTML Doc
        //      winCount
        winCountText.textContent = winCount;
        // Play round win sound
        playRoundWin();

        //Check if User won 10 Rounds
        if(winCount == 3) {
            //Congratualtions EndGame SCENARIO
            console.log("---- WINNER WINNER CHICKEN DINNER -----!!");
            // Play the sound for winning Game/10 rounds
            playGameWin();

            // Continue Screen?
            setTimeout(() => {
                continueScreen();
            }, 15000);
        }

        // Start a new round
        newRound();
    } else if (guessesLeft === 0) {
        // lose scenario
        lossCount++;
        console.log("ROUND LOST");
        // update show the following variables in HTML Doc
        //      lossCount
        lossCountText.textContent = lossCount;
        // Play round Loss sound
        playRoundLoss();
        //Check if User lost 10 Rounds
        if(lossCount == 3) {
            //Congratualtions EndGame SCENARIO
            console.log("---- LOSER OF 10 ROUNDS ----!!");
            // Play the sound for losing Game/10 rounds
            playGameLost();

            // Continue Screen?
            setTimeout(() => {
                continueScreen();
            }, 15000);
        }

        // start a new Round
        newRound();
    }   // In this non-existent ELSE: 
        //      User STILL has not fully guessed the word.
        //      User STILL has non-zero amount of Guesses left.
        // Result: 'Just do nothing and continue'
}

