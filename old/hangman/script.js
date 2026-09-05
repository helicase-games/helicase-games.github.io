let currentCategory = "";
let selectedObj, selectedWord, guessedLetters, mistakes;
const maxMistakes = 6;

const componentMap = [
    "membrane",          // Mistake 6 (Lysis)
    "nucleus-group",     // Mistake 5
    "mitochondria-group",// Mistake 4
    "golgi-group",       // Mistake 3
    "dna-group",         // Mistake 2
    "ribosomes-group"    // Mistake 1
];

// --- 1. Menu Logic ---
function buildMenu() {
    const grid = document.getElementById('category-buttons');
    grid.innerHTML = "";
    
    // Sort categories: Random Mixture first, then alphabetical
    const sortedKeys = Object.keys(bioCategories).sort((a, b) => {
        if (a === "Random Mixture") return -1;
        if (b === "Random Mixture") return 1;
        return a.localeCompare(b);
    });

    sortedKeys.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = cat === "Random Mixture" ? "cat-btn special-btn" : "cat-btn";
        btn.innerText = cat;
        btn.onclick = () => selectCategory(cat);
        grid.appendChild(btn);
    });
}

function selectCategory(cat) {
    currentCategory = cat;
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('active-category-title').innerText = cat;
    initGame();
}

function backToMenu() {
    document.getElementById('menu-container').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}

// --- 2. Game Logic ---
function initGame() {
    const categoryWords = bioCategories[currentCategory];
    selectedObj = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    selectedWord = selectedObj.word.toUpperCase();
    guessedLetters = [];
    mistakes = 0;

    document.getElementById('message').innerText = "";
    document.getElementById('hint-display').innerText = "";
    document.getElementById('guess-input').disabled = false;
    document.getElementById('guess-input').focus();
    
    // Reset SVG visuals
    document.getElementById('membrane').style.opacity = "1";
    document.getElementById('membrane').classList.remove('membrane-stressed');
    componentMap.forEach(id => {
        if(id !== "membrane") document.getElementById(id).classList.remove('component-inactive');
    });

    updateDisplay();
}

function updateDisplay() {
    // Word Display
    const displayString = selectedWord.split('').map(letter => {
        if (letter === " ") return "&nbsp;&nbsp;";
        if (/[0-9]/.test(letter)) return letter;
        return guessedLetters.includes(letter) ? letter : "_";
    }).join(' ');
    
    document.getElementById('word-display').innerHTML = displayString;

    // IMPORTANT: Fix Organelle Removal
    // We check mistakes and hide components from the end of the list backwards
    for (let i = 1; i < componentMap.length; i++) {
        const el = document.getElementById(componentMap[i]);
        if (i <= mistakes) {
            el.classList.add('component-inactive');
        } else {
            el.classList.remove('component-inactive');
        }
    }

    // Membrane Stress
    const membrane = document.getElementById('membrane');
    if (mistakes >= 4) membrane.classList.add('membrane-stressed');
    else membrane.classList.remove('membrane-stressed');

    // Letters Guessed
    document.getElementById('letters-guessed').innerText = guessedLetters.join(', ') || "None";

    // Win/Loss
    const cleanWord = selectedWord.replace(/[^A-Z0-9]/g, "");
    const isWon = cleanWord.split('').every(l => guessedLetters.includes(l));

    if (isWon) {
        document.getElementById('message').innerHTML = "<span style='color: #00ff95;'>✔ Cell Stabilized!</span>";
        document.getElementById('guess-input').disabled = true;
    } else if (mistakes >= maxMistakes) {
        document.getElementById('message').innerHTML = "<span style='color: #ff4757;'>❌ Lysis! Word was: " + selectedWord + "</span>";
        document.getElementById('guess-input').disabled = true;
        membrane.style.opacity = "0.2";
    }
}

function showHint() {
    document.getElementById('hint-display').innerText = "Hint: " + selectedObj.hint;
}

document.getElementById('guess-input').addEventListener('input', (e) => {
    const char = e.target.value.toUpperCase();
    if (char && /^[A-Z]$/.test(char) && !guessedLetters.includes(char)) {
        guessedLetters.push(char);
        // Correctly increment mistakes if wrong
        if (!selectedWord.includes(char)) {
            mistakes++;
        }
        updateDisplay();
    }
    e.target.value = '';
});

// Initialize the grid menu on load
buildMenu();