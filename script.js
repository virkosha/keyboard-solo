let word = document.querySelector('.word');
let numberWordsCorrect = document.querySelector('.correct-count');
let numberWordsWrong = document.querySelector('.wrong-count');
let numberMistakesWord = document.querySelector('.word-mistakes');
let timer = document.querySelector('#timer');

let wordIndex = 0;
//функция, которая содержит массив слов и возвращает рандомное слово из массива
function getRandomWord() {
    const listWords = [
        'apple',
        'blackberry',
        'lagom',
        'daughter',
        'family',
        'coach',
        'education',
        'cocoa',
        'popcorn',
        'marshmallow'
    ]

    wordIndex = Math.floor(Math.random() * listWords.length);
    return listWords[wordIndex];
}


//функция которая разбивает контент рандомного слова на буквы,оборачивает в span и обратно собирает массив в строку
function renderWord(listWord) {
    wordIndex = 0;
    word.innerHTML = listWord
        .split('')
        .map((letter) => `<span>${letter}</span>`)
        .join('');

}


//вызываем функцию рандомного слова для начала игры
let currentWord = getRandomWord();
//вызываем функцию дробящую слово на буквы
renderWord(currentWord);


//функция успешно набранных слов и символов   ???
function symbolCorrect() {
    //правильно набранному символу присваиваем класс "c"  (children - это теги-потомки HTML-элемента - наши буквы, обернутые в span)
    word.children[wordIndex].className = 'c';
    wordIndex++;
}


//функция ошибочно набранных слов и символов   ???
function symbolWrong() {
    //ошибочному символу присваиваем класс "w" (children - это теги-потомки HTML-элемента - наши буквы, обернутые в span)
    word.children[wordIndex].className = 'w';
    numberMistakesWord.textContent = ++numberMistakesWord.textContent;
}


//функция подытоживагия результатов игры
function checkWordsCount() {
    if (numberWordsCorrect.textContent >= 5) {
        alert(`Победа! Ваше время составило: ${timer.textContent}`)
    }

    if (numberWordsWrong.textContent >= 5) {
        alert(`Вы проиграли. Попробуйте вновь=) Ваше время составило: ${timer.textContent}`)
    }
}



//получаем доступ к таймеру
let timerId = setInterval(() => {
    let [minutes, seconds] = timer.textContent.split(':').map(Number);

    if (seconds < 59) {
        seconds++;
    } else {
        minutes++;
        seconds = 0;
    }

    timer.textContent = `${format(minutes)}:${format(seconds)}`;
}, 1000)


//описываем формат времени таймера
function format(val) {
    if (val < 10) {
        return `0${val}`;
    }
    return val;
}


//функция очищения таймера
function clearTimer() {
    clearInterval(timerId);
    timer.textContent = `00:00`
}



//функция подготовки к новому слову
function nextWord() {
    checkWordsCount();

    if (numberMistakesWord.textContent > 0) {
        numberWordsWrong.textContent = ++numberWordsWrong.textContent;
    }

    currentWord = getRandomWord();
    renderWord(currentWord);
    wordIndex = 0;
    numberMistakesWord.textContent = 0;



}


document.addEventListener('keyup', (event) => {
    console.log(event.key, currentWord);

    if (event.key === currentWord[wordIndex]) {
        symbolCorrect();
    } else {
        symbolWrong();
    }

    if (wordIndex === currentWord.length) {
        numberWordsCorrect.textContent = ++numberWordsCorrect.textContent;
        setTimeout(nextWord, 0);
    }
})


// рандомное слово
currentWord = getRandomWord();
// дроблю рандомное слово на буквы
renderWord(currentWord);