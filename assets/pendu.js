let animals = ['vache', 'chien', 'poisson', 'lion', 'koala'];
let wordString = '';
let wordToFind = '';

//Afficher un mot au hasard du tableau animals
function pickWord(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function searchIndex(word, letter) {
    console.log(word);
    let arrayIndex = [];
    let arrayLetterWord = word.split('');

    for (index = 0; index < arrayLetterWord.length; index++) {
        if (letter == arrayLetterWord[index]) {
            arrayIndex.push(index);
        }
    }

    if (arrayIndex.length === 0) {
        return -1;
    } else {
        return arrayIndex;
    }
}

//Afficher des underscores à la place du mot selon son nombre de caractères et réinitialiser clavier
function resetKeyboard() {

}

function displayUnderscore(word) {
    let wordChoosen = word.split('');
    wordString = '';
    for (i = 0; i < wordChoosen.length; i++) {
        wordString += '_';
    }
    document.getElementById('answer').innerHTML = wordString;
    wordToFind = word.toUpperCase();
}

document.getElementById('newWord').onclick = () => (displayUnderscore(pickWord(animals)));

//Afficher la lettre correspondant au bouton cliqué et le désactiver
// function chooseLetter(element){
//     if(element.target.nodeName == 'BUTTON'){
//         if(element.target.id != 'newWord'){
//            let idButton = element.target.id
//            document.getElementById('letterChoosen').innerHTML += idButton.toUpperCase()
//            document.getElementById(idButton).style.backgroundColor = '#D1C8E1' 
//            document.getElementById(idButton).disabled = true
//         }        
//     }    
// }

//Ajoute la lettre au mot cherché et désactive la lettre cliquée
function chooseLetter(element) {
    if (element.target.nodeName == 'BUTTON' && element.target.id != 'newWord') {
        let letterClick = element.target.textContent;
        let answerWord = searchIndex(wordToFind, letterClick);
        document.getElementById('answer').textContent = replaceLetters(letterClick, answerWord);
        console.log(answerWord);
        element.target.style.backgroundColor = '#D1C8E1';
        element.target.disabled = true;
    }

}

document.addEventListener('click', chooseLetter);

function replaceLetters(letter, arrayPosition) {
    let arrayWordString = wordString.split('');
    for (i = 0; i < arrayPosition.length; i++) {
        arrayWordString[arrayPosition[i]] = letter;
    }
    wordString = arrayWordString.join('');
    return wordString;
}