'use strict';
import Score from './score.js';

// Word list

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
  'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
  'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
  'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
  'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
  'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
  'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
  'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
  'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
  'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
  'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
  'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
  'keyboard', 'window'
];

// DOM elements
const wordElement = document.querySelector('.word');
const userInput = document.querySelector('.userInput');
const timeElement = document.querySelector('.time');
const scoreElement = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const restartBtn = document.querySelector('.restartBtn');
const scoreBtn = document.querySelector('.scoreBtn');
const gameEndContainer = document.querySelector('.gameEndContainer');
const backgroundMusic = document.querySelector('#backgroundMusic');
const correctSound = document.querySelector('#correctSound');
const resetBtn = document.querySelector('.resetBtn');

let time = 99;
let score = 0;
let isPlaying = false;
let wordIndex;
let timerInterval; // Variable to store the interval ID

// Initialize game
function init() {
  // Load background music
  backgroundMusic.play();

  // Show random word
  showWord();

  // Start countdown
  timerInterval = setInterval(updateTime, 1000); // Store the interval ID

  // Check input
  userInput.addEventListener('input', startMatch);

  // Restart game
  restartBtn.addEventListener('click', restartGame);
  resetBtn.addEventListener('click', resetGame);

  // Show score
  scoreBtn.addEventListener('click', showScore);
}


function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    startBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    time = 5;
    score = 0;
    scoreElement.textContent = score;
    showWord();
    userInput.style.display = 'block'
    userInput.value = '';
    userInput.focus();
    scoreElement.style.display = 'inline';



    // Initialize game
    init();
  }
}

// Reset game
function resetGame() {
  score = 0;
  scoreElement.textContent = score;
  time = 99;
  timeElement.textContent = time;
  userInput.value = '';
  showWord();
  // Reset game state
  isPlaying = false;
  clearInterval(timerInterval);
  backgroundMusic.pause();
  resetBtn.style.display = 'inline-block';
  gameEndContainer.style.display = 'none';
  resetBtn.style.display = 'none'; // Hide reset button
}


// Restart game
function restartGame() {
  isPlaying = false;
  startBtn.style.display = 'inline-block'; // Show the start button
  restartBtn.style.display = 'none'; // Hide the restart button
  gameEndContainer.style.display = 'none';
  userInput.style.display = 'block'; // Show the userInput element
  wordElement.style.display = 'block'; // Show the word element

  // Reset userInput value and style
  userInput.value = '';
  userInput.removeAttribute('disabled');
  userInput.focus();

  // Reset word element style
  wordElement.textContent = '';


  // Redirect to the starting page
  window.location.href = 'index.html'; // Change 'index.html' to your actual starting page file name
}

// Game over
function gameOver() {
  isPlaying = false;
  startBtn.disabled = false;
  backgroundMusic.pause();
  startBtn.style.display = 'none'
  userInput.style.display = 'none'
  wordElement.style.display = 'none'
  gameEndContainer.style.display = 'block';
}

function showScore() {
  // Calculate percentage
  const percentage = ((score / words.length) * 100).toFixed(2);

  // Get current date and time
  const currentDate = new Date().toLocaleString();

  // Create a new Score instance
  const currentScore = new Score(currentDate, score, words.length);

  // Log the score for testing
  console.log(currentScore);

  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = score;
}


// Show random word
function showWord() {
  wordIndex = Math.floor(Math.random() * words.length);
  wordElement.textContent = words[wordIndex];
}

// Update time
function updateTime() {
  time--;
  timeElement.textContent = time;

  if (time === 5) {
    showWord();
  }

  if (time === 0) {
    clearInterval(timerInterval); // Clear the interval to stop the timer
    gameOver();
  }
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    score++;
    scoreElement.textContent = score;
    wordElement.style.color = '#fae128';
    wordElement.style.fontWeight = '600';

    correctSound.play();

 // Pause the sound after 1 seconds
 setTimeout(() => {
  correctSound.pause();
  correctSound.currentTime = 0; // Reset audio to the beginning
}, 1000);

    setTimeout(() => {
      wordElement.style.color = ''; // Reset color after a delay (optional)
      showWord();
    }, 500); // Adjust delay as needed
    userInput.value = '';
  }
}



// Match words
function matchWords() {
  if (userInput.value === wordElement.textContent.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}




// Start game when Start button is clicked
startBtn.addEventListener('click', startGame);

restartBtn.addEventListener('click', restartGame);
resetBtn.addEventListener('click', resetGame);
