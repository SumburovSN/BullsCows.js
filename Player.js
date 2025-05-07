class Player {
    _gameLog = [];
    _decisionMaker;

    constructor(){
        this._decisionMaker = new DecisionMaker();
    }

    async nextGuess(){
        let guess = "";
        if (this._gameLog.length == 0) guess = this._decisionMaker.pick();
        else if (this._decisionMaker.getDecisionsField().length == 0) {
            return "errorInCode";
        }
        else if (this._decisionMaker.getDecisionsField().length == 1)
            guess = this._decisionMaker.getDecisionsField()[0];
        else
            guess = await this._decisionMaker.getNextGuess(this._gameLog[this._gameLog.length-1][0], this._gameLog[this._gameLog.length-1][1]);
        return guess;
    }

    getResponse(guess){
        return this.getDecisionMaker().getBullsCows(this.getDecisionMaker().getSecretCode(), guess);
    }

    addGameLogEntry(guess, response) {
        this._gameLog.push([guess, response]);
    }

    getDecisionMaker() {
        return this._decisionMaker;
    }

    getGameLog() {
        return this._gameLog;
    }

    isInputValid(number){
        return this.getDecisionMaker().getFull().includes(number);
    }

    getDecisionsField(){
        return this.getDecisionMaker().getDecisionsField();
    }

    setSecretCode(number){
        this.getDecisionMaker().setSecretCode(number);
    }

    getSecretCode() {
        return this.getDecisionMaker().getSecretCode();
    }
}