const dictionary = {
    hello: 'salut',
    name: 'nom',
    accept: 'accepter',
    car: 'voiture',
    day: 'jour',
};

let words = [];
let translatedWords = [];
// store keys in words and store values  translatedWords;
for (let key in dictionary) {
    words.push(key);
    let value = dictionary[key];
    translatedWords.push(value);
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
words = shuffleArray(words);
translatedWords = shuffleArray(translatedWords);
renderWords();
renderTranslatedWords();
GameManager();

function renderWords() {
    const column1 = document.querySelector('.column-1');
    const innerContainer = document.querySelector('.innerContainer');

    words.forEach((word) => {
        const wordElement = createWordElement(word);
        column1.appendChild(wordElement);
    });

    innerContainer.appendChild(column1);
}

function renderTranslatedWords() {
    const innerContainer = document.querySelector('.innerContainer');
    const translatedWordsList = document.createElement('div');
    translatedWordsList.className = "column-2";

    translatedWords.forEach((word) => {
        const wordElement = createWordElement(word);
        translatedWordsList.appendChild(wordElement);
    });

    innerContainer.appendChild(translatedWordsList);
}

function createWordElement(word) {
    const wordElement = document.createElement('div');
    wordElement.className = "word";
    wordElement.textContent = word;
    return wordElement;
}

function handleWordClick(e) {
    const clickedWordColumn1 = e.target;

    // Check if the word already has 'wordStyle-2'
    if (clickedWordColumn1.classList.contains('wordStyle-2')) {
        return;
    }

    const column = clickedWordColumn1.closest('.column-1');

    // Toggle the selected style for the clicked word
    clickedWordColumn1.classList.toggle('wordStyle');

    // Deselect all words in the same column
    column.querySelectorAll('.word').forEach(word => {
        if (word !== clickedWordColumn1) {
            word.classList.remove('wordStyle');
        }
    });

    return clickedWordColumn1;
}

function handleWordClick2(e) {
    const clickedWordColumn2 = e.target;

    // Check if the word already has 'wordStyle-2'
    if (clickedWordColumn2.classList.contains('wordStyle-2')) {
        return;
    }

    const column = clickedWordColumn2.closest('.column-2');

    // Toggle the selected style for the clicked word
    clickedWordColumn2.classList.toggle('wordStyle');

    // Deselect all words in the same column
    column.querySelectorAll('.word').forEach(word => {
        if (word !== clickedWordColumn2) {
            word.classList.remove('wordStyle');
        }
    });

    return clickedWordColumn2;
}

function GameManager() {
    const wordsColumn1 = document.querySelectorAll('.column-1 .word');
    const wordsColumn2 = document.querySelectorAll('.column-2 .word');

    wordsColumn1.forEach(word => {
        word.addEventListener('click', function (e) {
            clickedWordColumn1 = handleWordClick(e);
            compareWords();
        });
    });

    wordsColumn2.forEach(word => {
        word.addEventListener('click', function (e) {
            clickedWordColumn2 = handleWordClick2(e);
            compareWords(clickedWordColumn1.textContent, clickedWordColumn2.textContent);
            styleWords();
        });
    });

    function compareWords(word1, word2) {
        // Check if the words match in the original order (English to French)
        const matchOriginalOrder = dictionary[word1] === word2;

        // Check if the words match in the reversed order (French to English)
        const matchReversedOrder = dictionary[word2] === word1;

        // Return true if there's a match in either order
        return matchOriginalOrder || matchReversedOrder;
    }


    function styleWords() {
        const score = document.querySelector('.score');
        const progressBar = document.querySelector('.bar');
        const progressBarWidth = parseFloat(getComputedStyle(progressBar).width);
    
        if (compareWords(clickedWordColumn1.textContent, clickedWordColumn2.textContent)) {
            clickedWordColumn1.classList.add('wordStyle-2');
            clickedWordColumn2.classList.add('wordStyle-2');
            clickedWordColumn1.removeEventListener('click', handleWordClick);
            clickedWordColumn2.removeEventListener('click', handleWordClick2);
            // Update the width of the progress bar
            const newWidth = progressBarWidth + 70;
            progressBar.style.width = newWidth + 'px';
            if (progressBar.style.width == 350+'px') {
                setTimeout(() => {
                    // Reset the game here (you can call a function to reset or reload the page)
                    location.reload(); // This will refresh the entire page
                }, 1000);}
        } else {
            // If they don't match, add the wordStyle-3 class temporarily
            clickedWordColumn1.classList.toggle('wordStyle-3');
            clickedWordColumn2.classList.toggle('wordStyle-3');
            score.textContent -= 1;
    
            // Check if the score is zero, and refresh the game if needed
            if (score.textContent == 0) {
                setTimeout(() => {
                    // Reset the game here (you can call a function to reset or reload the page)
                    location.reload(); // This will refresh the entire page
                }, 1000);
            } else {
                // After the next frame, remove the wordStyle-3 class
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        clickedWordColumn1.classList.remove('wordStyle-3');
                        clickedWordColumn2.classList.remove('wordStyle-3');
                        clickedWordColumn1.classList.remove('wordStyle');
                        clickedWordColumn2.classList.remove('wordStyle');
                    }, 500);
                });
            }
        }
    }
    

}

// function compareWords() {
//     const score = document.querySelector('.score');
//     // Check if both words are selected
//     if (clickedWordColumn1 && clickedWordColumn2) {
//         // Get the index of the selected words in the arrays
//         const indexColumn1 = words.indexOf(clickedWordColumn1.textContent);
//         const indexColumn2 = translatedWords.indexOf(clickedWordColumn2.textContent);

//         // Check if the words match based on their index in the arrays
//         if (indexColumn1 !== -1 && indexColumn2 !== -1 && indexColumn1 === indexColumn2) {
//             // If they match, add the wordStyle-2 class
//             clickedWordColumn1.classList.add('wordStyle-2');
//             clickedWordColumn2.classList.add('wordStyle-2');
//         } else {
//             // If they don't match, add the wordStyle-3 class temporarily
//             clickedWordColumn1.classList.add('wordStyle-3');
//             clickedWordColumn2.classList.add('wordStyle-3');
//             score.textContent -= 1;
//             // Use requestAnimationFrame to wait for the next frame
//             requestAnimationFrame(() => {
//                 // After the next frame, remove the wordStyle-3 class
//                 setTimeout(() => {
//                     clickedWordColumn1.classList.remove('wordStyle-3');
//                     clickedWordColumn2.classList.remove('wordStyle-3');
//                 }, 500);
//             });
//         }

//         // Reset clicked words for the next selection
//         clickedWordColumn1 = null;
//         clickedWordColumn2 = null;
//     }
// }