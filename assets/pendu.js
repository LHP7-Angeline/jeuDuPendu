let animals = ['vache', 'chien', 'poisson', 'lion', 'koala'];
let wordString = '';
let wordToFind = '';
let lifes = 8;


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
    return arrayIndex;
    // if (arrayIndex.length === 0) {
    //     return -1;
    // } else {
    //     return arrayIndex;
    // }
}

//Afficher des underscores à la place du mot selon son nombre de caractères et réinitialiser clavier
function resetKeyboard() {
    document.addEventListener('click', chooseLetter);
    let elts = document.getElementsByTagName('button')

    for(i=0; i<elts.length; i++){
        elts[i].disabled = false;
        elts[i].style.backgroundColor = '#7DAA92';
    }
}

function newPlay(word) {
    let wordChoosen = word.split('');
    wordString = '';
    lifes = 8;
    document.getElementById('lifeLeft').textContent = lifes;
    for (i = 0; i < wordChoosen.length; i++) {
        wordString += '_';
    }
    document.getElementById('answer').innerHTML = wordString;
    wordToFind = word.toUpperCase();
    resetKeyboard();
    document.getElementById('endPlay').textContent = '';
}

document.getElementById('newWord').onclick = () => (newPlay(pickWord(animals)));


//Ajouter la lettre au mot cherché, désactiver la lettre cliquée, retirer une vie pour chaque erreur
function chooseLetter(element) {

    if (element.target.nodeName == 'BUTTON' && element.target.id != 'newWord') {
        let letterClick = element.target.textContent;
        let answerWord = searchIndex(wordToFind, letterClick);

        if(answerWord.length != 0){
            document.getElementById('answer').textContent = replaceLetters(letterClick, answerWord);
            if(!wordString.includes('_') && lifes > 0){
                document.getElementById('endPlay').textContent = `VICTOIRE !`;
                document.removeEventListener('click', chooseLetter); //Désactiver clavier en cas de victoire
            }

        }else{
           lifes--;
           if(lifes <= 0){
            lifes = 0;
            document.getElementById('endPlay').textContent = 'PERDU !'
           }
           document.getElementById('lifeLeft').textContent = lifes; 
        }

        
        console.log(answerWord);
        element.target.style.backgroundColor = '#D1C8E1';
        element.target.disabled = true;
    }

}



//Remplacer underscore par lettre cliquée
function replaceLetters(letter, arrayPosition) {
    let arrayWordString = wordString.split('');
    for (i = 0; i < arrayPosition.length; i++) {
        arrayWordString[arrayPosition[i]] = letter;
    }
    wordString = arrayWordString.join('');
    return wordString;
}