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
};

async function compGame() {
    clearTableua();
    let game = new BullsCows();
    game.startCompGame();
}

async function userGame() {
    clearTableua();
    let game = new BullsCows();
    game.startUserGame();
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

function clearElement(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
      }
}

function endGame(message) {
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
