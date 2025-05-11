class BullsCows {
    _player1;
    _player2;
    _isGame;

    constructor(){
        this._player1 = new Player();
        this._player2 = new Player();
        this._isGame = true;
    }

    async startCompGame(){
        while (this._isGame){
            let move = this.getPlayer1().getGameLog().length + 1;
            insertGameMessage(phrases.getPhrase("move") + move);
            await this.player1Guessing();
            await this.player2Guessing();
            this.checkCurrentResult();
        }
    }

    checkCurrentResult(){
        if (this.getPlayer1().getGameLog().at(-1)[1] == 40 || this.getPlayer2().getGameLog().at(-1)[1] == 40) {
                this._isGame = false;
                this.printWinner();
                endGame(phrases.getPhrase("gameover"));
            }
        if (this.getPlayer1().getDecisionsField().length == 0 || this.getPlayer2().getDecisionsField().length == 0) 
            this._isGame = false;
    }

    async startUserGame(){
        insertGameMessage(phrases.getPhrase("guessNumber"));
        let place = insertPlayerMessage("", 2)
        insertUserForm(place, phrases.getPhrase("promptToNumber"), this, 1);
    }

    async nextStep(){
        let move = this.getPlayer1().getGameLog().length + 1;
        if (move > 1) this.checkCurrentResult();
        if (!this._isGame) return;
        insertGameMessage(phrases.getPhrase("move") + move);
        await this.player1Guessing();
        await this.userGuessing();
    }

    async inputHandling(guess, type){
        if (this.isInputValid(guess)) {
            switch (type){
                case 1:
                    await this.setSecretCode(guess);
                    break;
                case 2:
                    await this.handlingUserGuess(guess);
            }
        }
    }

    async handlingUserGuess(guess){
        tableua.lastChild.lastChild.innerHTML = guess
        const response = this.getPlayer1().getResponse(guess);        
        insertPlayerMessage(this.formatResponse(response), 1);
        this.getPlayer2().addGameLogEntry(guess, response);
        
        await this.nextStep();
    }

    async setSecretCode(number){
        if (this.isInputValid(number)) {
            this.getPlayer2().setSecretCode(number);
            clearTableua();
            insertGameMessage(phrases.getPhrase("gameOn"));
            insertPlayerMessage(phrases.getPhrase("secretCode") + this.getPlayer2().getSecretCode(), 2);
        }
        await this.nextStep();        
    }

    isInputValid(number) {
        return this.getPlayer2().isInputValid(number);
    }

    async player1Guessing(){
        showInfo(phrases.getPhrase("player1thinking"));
        const guess = await this.getPlayer1().nextGuess();
        insertPlayerMessage(guess, 1);
        const response = this.getPlayer2().getResponse(guess);
        insertPlayerMessage(this.formatResponse(response), 2);
        this.getPlayer1().addGameLogEntry(guess, response);
    }

    async player2Guessing(){
        showInfo(phrases.getPhrase("player2thinking"));
        const guess = await this.getPlayer2().nextGuess();
        insertPlayerMessage(guess, 2);
        const response = this.getPlayer1().getResponse(guess);
        insertPlayerMessage(this.formatResponse(response), 1);
        this.getPlayer2().addGameLogEntry(guess, response);
    }

    async userGuessing(){
        showInfo(phrases.getPhrase("player2thinking"));
        let place = insertPlayerMessage("", 2);
        insertUserForm(place, phrases.getPhrase("promptToNumber"), this, 2);
        if (this.getPlayer2().getGameLog().length > 0){
            const hint = await this.getPlayer2().nextGuess();
            addHint(place, phrases.getPhrase("hint") + hint);
            addHint(place, phrases.getPhrase("gamelog") + this.getPlayer2().getGameLog());
            addHint(place, phrases.getPhrase("rest") + this.getPlayer2().getDecisionsField().length);
            if (this.getPlayer2().getDecisionsField().length < 10) addHint(place, this.getPlayer2().getDecisionsField());
        }
    }

    formatResponse(response) {
        const bulls = Math.floor( response / 10);
        const cows = response - bulls * 10;
        return bulls + String.fromCodePoint(0x1F402) + " " + cows + String.fromCodePoint(0x1F404);
    }

    printWinner() {
        const response1 = this.getPlayer2().getGameLog().at(-1)[1];
        const response2 = this.getPlayer1().getGameLog().at(-1)[1];
        if (response1 == 40 && response2 == 40) insertGameMessage(phrases.getPhrase("draw"));
        else if (response1 == 40) insertGameMessage(phrases.getPhrase("player2won"));
        else if (response2 == 40) insertGameMessage(phrases.getPhrase("player1won"), 0);
        this.printGameLog();
    }

    printGameLog(){
        let message = '<p>' + phrases.getPhrase("gamelog") + '</p>';
        let history = "";
        for (const entry of this.getPlayer1().getGameLog()) history += "(" + entry[0] + "-" + entry[1] + ")";
        message += '<p>[' + history + ']</p>';
        history = "";
        for (const entry of this.getPlayer2().getGameLog()) history += "(" + entry[0] + "-" + entry[1] + ")";
        message += '<p>[' + history + ']</p>';
        insertReferenceMessage(message);
    }

    getPlayer1(){
        return this._player1;
    }

    getPlayer2(){
        return this._player2;
    }
}