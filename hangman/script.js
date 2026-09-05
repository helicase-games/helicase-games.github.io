// 1. Your Bio-Word Bank (Since we are doing this solo for now)
const bioWords = ["MITOCHONDRIA", "NUCLEOTIDE", "BIOINFORMATICS", "POLYMERASE", "RIBOSOME"];
let selectedWord = bioWords[Math.floor(Math.random() * bioWords.length)];
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6; // ATP units

// 2. Select Elements from HTML
const wordDisplay = document.getElementById('word-display');
const categoryDisplay = document.getElementById('category-display');
const lettersGuessed = document.getElementById('letters-guessed');
const guessInput = document.getElementById('guess-input');

// 3. Logic to show the word (e.g., R _ B _ S _ M E)
function updateGame() {
    // Show underscores or letters
    const displayString = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(' ');
    
    wordDisplay.innerText = displayString;
    categoryDisplay.innerText = "General Biology";
    lettersGuessed.innerText = guessedLetters.join(', ');

    // Check for Win
    if (!displayString.includes("_")) {
        alert("Success! The sequence is complete. 🎉");
        resetGame();
    }

    // Check for Loss
    if (mistakes >= maxMistakes) {
        alert("Cell Death: Out of ATP! The word was: " + selectedWord);
        resetGame();
    }
}

function resetGame() {
    selectedWord = bioWords[Math.floor(Math.random() * bioWords.length)];
    guessedLetters = [];
    mistakes = 0;
    updateGame();
}

// 4. Handle User Input
guessInput.addEventListener('input', (e) => {
    const letter = e.target.value.toUpperCase();
    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            mistakes++;
        }
        updateGame();
    }
    e.target.value = ''; // Clear input box
});

updateGame();