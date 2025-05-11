class Player {
    _gameLog = [];
    _decisionMaker;

    constructor(){
        this._decisionMaker = new DecisionMaker();
    }

    async nextGuess(){
        let guess = "";
        if (this.getGameLog().length == 0) guess = this.getDecisionMaker().pick();
        else if (this.getDecisionsField().length == 0) {
            return "errorInCode";
        }
        else if (this.getDecisionsField().length == 1)
            guess = this.getDecisionsField()[0];
        else
            guess = await this.getDecisionMaker().getNextGuess(this.getGameLog().at(-1)[0], this.getGameLog().at(-1)[1]);
        return guess;
    }

    async getGuessList() {
        if (this.getDecisionsField().length == 0) {
            return "errorInCode";
        }
        return await this.getDecisionMaker().getGuessList(this.getGameLog().at(-1)[0], this.getGameLog().at(-1)[1]);
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