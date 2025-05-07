let info;
let gamelog;
let progressBar;
let tableua;
let languageSelection;
let phrases = new Phrases(1);


window.onload = function() {
    info = document.getElementById("info");
    gamelog = document.getElementById("gamelog");
    progressBar = document.getElementById("progressBar");
    tableua = document.getElementById("tableua");
    languageSelection = document.getElementById("language");

    const compVsComp = document.getElementById("compVsComp");
    compVsComp.addEventListener("click", async () => {
        await compGame();
    });

    const compVsUser = document.getElementById("compVsUser");
    compVsUser.addEventListener("click", async () => {
        await userGame();
    });
    
    languageSelection.addEventListener("change", async () => {
        changeLanguage();
    });

    // const makeGuessBtn = document.getElementById("makeGuessBtn");
    // makeGuessBtn.addEventListener("click", () => {showInfo("Привет от другой кнопки!");});
    
    // console.log(notes.innerHTML);
};

async function compGame() {
    clearTableua();
    let game = new BullsCows();
    // progressBar.style.display = "inline";
    game.startCompGame();
}

async function userGame() {
    clearTableua();
    let game = new BullsCows();
    // progressBar.style.display = "inline";
    
    clearTableua();
    insertGameMessage("Загадываем число...");
    
    let place = insertPlayerMessage("", 2)
    insertUserForm(place, "Введите 4-значное число с разными цифрами", game, 1);
}

async function setProgress(progress) {
    progressBar.value = progress;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showInfo(message){
    info.innerHTML = message;
}

function insertPlayerMessage(message, player) {
    let playerMessage;
    if (player == 1) playerMessage = getMessageBox(message, "message-left");
    else playerMessage = getMessageBox(message, "message-right");
    let emptyBox = getMessageBox("", "empty-box");
    let place = tableua.lastChild;
    if (player == 1) {
        place.append(playerMessage);
        place.append(emptyBox);
    } else {
        place.append(emptyBox);
        place.append(playerMessage);
    }
    playerMessage.scrollIntoView();
    return playerMessage;
}

function insertGameMessage(message){
    let messageContainer = getMessageBox("", "message-container");
    let gameMessage = getMessageBox(message, "message center-text");
    messageContainer.append(gameMessage);
    tableua.append(messageContainer);
    gameMessage.scrollIntoView();
}

function insertReferenceMessage(message){
    let messageContainer = getMessageBox("", "message-container");
    let gameMessage = getMessageBox(message, "message reference-text");
    messageContainer.append(gameMessage);
    tableua.append(messageContainer);
    gameMessage.scrollIntoView();
}

function clearTableua() {
    while (tableua.hasChildNodes()) {
        tableua.removeChild(tableua.firstChild);
      }
}

function endGame(message) {
    // progressBar.style.display = "none";
    showInfo(message)
}

function changeLanguage() {
    language = parseInt(languageSelection.value);
    phrases.setLanguage(language);
    clearTableua();
    insertGameMessage(phrases.getPhrase("tableau"));    
    info.innerHTML = phrases.getPhrase("info");
}

function insertUserForm(place, message, game, type){
    let inputElement = getInputElement(message, game, type);
    for (let element of inputElement) place.append(element);
    document.getElementById("guess").focus();
}

function addHint(place, info){
    let txtInfo = document.createElement('p');
    txtInfo.className = "reference-text";
    txtInfo.innerHTML = info;
    place.append(txtInfo);
    txtInfo.scrollIntoView();
}

function getMessageBox(message, className){
    let messageBox = document.createElement('div');
    messageBox.className = className;
    messageBox.innerHTML = message;
    return messageBox;
}

function getInputElement(message, game, type){
    let inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "text");
    inputNumber.setAttribute("id", "guess");
    inputNumber.setAttribute("size", "4");
    let inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", "guess");
    inputLabel.innerHTML = message;
    let inputBtn = document.createElement("button");
    inputBtn.innerHTML = "✔";
    inputBtn.setAttribute("id", "inputBtn");
    inputBtn.addEventListener("click", async () => {await game.inputHandling(inputNumber.value, type);});
    inputNumber.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            await game.inputHandling(inputNumber.value, type);
        }
    });
    return [inputLabel, inputNumber, inputBtn];
}

// function setSecretCode(number, player){
//     if (player.isInputValid(number)) {
//         player.getDecisionMaker().setSecretCode(number);
//         clearTableua();
//         insertGameMessage("Игра началась");
//         insertPlayerMessage("Вы загадали число " + player.getDecisionMaker().getSecretCode(number), 2);        
//     }
// }

// function insertUserForm(player){
//     clearTableua();
//     insertGameMessage("Загадываем число...");
//     let playerMessage = getMessageBox("", "message-right");
//     let emptyBox = getMessageBox("", "empty-box");
//     let inputElement = getInputElement("Введите число", player);
//     for (let element of inputElement) playerMessage.append(element);
//     tableua.lastChild.append(emptyBox);
//     tableua.lastChild.append(playerMessage);
//     playerMessage.scrollIntoView();
// }

// function insertUserForm(message, game, type){
//     let playerMessage = getMessageBox("", "message-right");
//     let emptyBox = getMessageBox("", "empty-box");
//     let inputElement = getInputElement(message, game, type);
//     for (let element of inputElement) playerMessage.append(element);
//     tableua.lastChild.append(emptyBox);
//     tableua.lastChild.append(playerMessage);
//     playerMessage.scrollIntoView();
// }

// function getInputElement(message, player){
//     let inputNumber = document.createElement("input");
//     inputNumber.setAttribute("type", "text");
//     inputNumber.setAttribute("id", "guess");
//     inputNumber.setAttribute("size", "4");
//     let inputLabel = document.createElement("label");
//     inputLabel.setAttribute("for", "guess");
//     inputLabel.innerHTML = message;
//     let inputBtn = document.createElement("button");
//     inputBtn.innerHTML = "✔";
//     inputBtn.setAttribute("id", "inputBtn");
//     // inputBtn.addEventListener("click", () => {showInfo(player.isInputValid(inputNumber.value));});
//     inputBtn.addEventListener("click", () => {player.setSecretCode(inputNumber.value);});
//     return [inputLabel, inputNumber, inputBtn];
// }
