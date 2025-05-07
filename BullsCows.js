class BullsCows {
    _player1;
    _player2;
    _isGame;

    constructor(){
        this._player1 = new Player();
        // if (user > 0) player2 = new UserPlayer(language);
        // else player2 = new Player(language);
        this._player2 = new Player();
        this._isGame = true;
    }

    async startCompGame(){
        let move = 1;
        let response1;
        let response2;
        while (this._isGame){
            insertGameMessage(phrases.getPhrase("move") + move);
            response2 = await this.player1Guessing();
            response1 = await this.player2Guessing();
            // if (response1 == 5) {
            //     insertGameMessage(phrases.getPhrase("end"));
            //     continue;
            // }
            if (response2 == 40 || response1 == 40) {
                this._isGame = false;
                this.printWinner(response1, response2);
                // this.printWinner(response1, response2);
                endGame(phrases.getPhrase("gameover"));
            }
            if (this.getPlayer1().getDecisionsField().length == 0 ||
            this.getPlayer2().getDecisionsField().length == 0) this._isGame = false;
            move++;
        }
    }

    async startUserGame(){
        this.inputSecretCode();
        await this.nextStep();
    }

    async nextStep(){
        if (!this._isGame) return;
        if (this.getPlayer1().getDecisionsField().length == 0 ||
            this.getPlayer2().getDecisionsField().length == 0) this._isGame = false;
        if (this.getPlayer1().getGameLog().length > 0) {
            if (this.getPlayer1().getGameLog().at(-1)[1] == 40 || this.getPlayer2().getGameLog().at(-1)[1] == 40) {
                this._isGame = false;
                this.printWinner();
                endGame(phrases.getPhrase("gameover"));
            }
        }
        let move = this.getPlayer1().getGameLog.length + 1;
        insertGameMessage(phrases.getPhrase("move") + move);
        // await this.player1Guessing();
        this.inputGuess();
    }

    async inputHandling(guess, type){
        if (this.isInputValid(guess)) {
            switch (type){
                case 1:
                    await this.setSecretCode(guess);
                    break;
                case 2:
                    tableua.lastChild.removeChild(tableua.lastChild.lastChild);
                    tableua.lastChild.removeChild(tableua.lastChild.lastChild);
                    insertPlayerMessage(guess, 2);
                    const response = this.getPlayer1().getResponse(guess);
                    insertPlayerMessage(this.formatResponse(response), 1);
                    this.getPlayer2().addGameLogEntry(guess, response);
                    await this.userGuessing();
            }
        }
    }

    inputSecretCode(){
        clearTableua();
        insertGameMessage("Загадываем число...");
        insertUserForm(this.getPlayer2(), 1);
    }

    // inputGuess(){
    //     insertUserForm(this, 2);
    // }

    async setSecretCode(number){
        if (this.isInputValid(number)) {
            this.getPlayer2().setSecretCode(number);
            clearTableua();
            insertGameMessage("Игра началась");
            insertPlayerMessage("Вы загадали число " + this.getPlayer2().getSecretCode(), 2);
        }
        await this.userGuessing();
    }

    // getCompResponse(guess){
    //     return this.getPlayer1().getResponse(guess);
    // }

    isInputValid(number) {
        return this.getPlayer2().isInputValid(number);
    }

    async player1Guessing(){
        let guess;
        let response;
        // let message = "";
        showInfo(phrases.getPhrase("player1thinking"));
        guess = await this.getPlayer1().nextGuess();
        // message += "<p>" + phrases.getPhrase("rest") + this._player1.getDecisionMaker().getDecisionsField().length + "</p>";
        // message += "<p>" + guess + "</p>";
        // message = guess;
        insertPlayerMessage(guess, 1);
        response = this.getPlayer2().getResponse(guess);
        insertPlayerMessage(this.formatResponse(response), 2);
        this.getPlayer1().addGameLogEntry(guess, response);
        return response;
    }

    async player2Guessing(){
        let guess;
        let response;
        // let message = "";
        showInfo(phrases.getPhrase("player2thinking"));
        guess = await this.getPlayer2().nextGuess();
        // message += "<p>" + phrases.getPhrase("rest") + this._player2.getDecisionMaker().getDecisionsField().length + "</p>";
        // message += "<p>" + guess + "</p>";
        // message = guess;
        insertPlayerMessage(guess, 2);
        response = this.getPlayer1().getResponse(guess);
        insertPlayerMessage(this.formatResponse(response), 1);
        this.getPlayer2().addGameLogEntry(guess, response);
        return response;
    }

    async userGuessing(){
        let hint;
        const move = this.getPlayer2().getGameLog().length > 0 ? this.getPlayer2().getGameLog().length + 1 : 1;
        showInfo(phrases.getPhrase("player2thinking"));        
        insertGameMessage(phrases.getPhrase("move") + move);
        hint = await this.getPlayer2().nextGuess();        
        let place = insertPlayerMessage("", 2);
        insertUserForm(place, "Введите 4-значное число с разными цифрами", this, 2);
        addHint(place, "Подсказка: " + hint);
        // guess = await this.inputGuessNumber();
        // response = this.getPlayer1().getResponse(guess);
        // insertPlayerMessage(this.formatResponse(response), 1);
        // this.getPlayer2().addGameLogEntry(guess, response);
        // return response;
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
        // for (const entry of this._player2.getGameLog()) history += entry + " ";
        // message += '<p>' + history + '</p>';
        insertReferenceMessage(message);
    }

    getPlayer1(){
        return this._player1;
    }

    getPlayer2(){
        return this._player2;
    }
}