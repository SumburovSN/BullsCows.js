class DecisionMaker {
	_sourceSet = '0123456789';
	_possibleAnswersSet = [0, 1, 2, 3, 4, 10, 11, 12, 13, 20, 21, 22, 30, 40];
    _full = [];
    _decisionsField = [];
    _secretCode;

    constructor(){
        this.buildFull("", this._sourceSet);
        this._decisionsField = [...this._full];
        this.secretCode = this.pick();
    }

	pick(){
        let numeric = this._sourceSet;
        let puzzle = "";
		let symbol;
		let index;
        while (puzzle.length != 4) {
            index = parseInt(Math.random() * numeric.length);
            symbol = numeric.charAt(index);
            numeric = numeric.replace(symbol, "");
            puzzle += symbol;}
		return puzzle;
		}

    getBullsCows(secretCode, guess) {
        let bulls = 0;
        let cows = 0;
        for (let i = 0; i < 4; i++) {
            for (let k = 0; k < 4; k++) {
                if (guess.charAt(i) == secretCode.charAt(k)) {
                    if ( i == k) bulls += 1;
                    else cows += 1;
                }
            }
        }
        // the response of template 12 (0, 22, etc.)
        return bulls * 10 + cows;
    }

    buildFull(subset, sourceSet){
        if (subset.length == 4) this._full.push(subset);
        else {
            for (let i = 0; i < sourceSet.length; i++) {
                this.buildFull(subset + sourceSet.charAt(i), sourceSet.substring(0, i) +
                        sourceSet.substring(i + 1));
            }
        }
    }

    narrowDecisionsField(guess, response) {
        let newDecisionField = [];
        this._decisionsField.forEach(number => {
            if (this.getBullsCows(number, guess) == response) newDecisionField.push(number);
        });
       this._decisionsField = newDecisionField;
   }
    
    async getDistribution(guess){
        let distribution    = new Map();
        for (let answer of this._possibleAnswersSet) {
            distribution.set(answer, []);
        }
        for (let number of this._decisionsField) {
            distribution.get(this.getBullsCows(number, guess)).push(number);
        }
        return distribution;
    }

    async getBasketsAmount(guess){
        let basket = [];
        const distribution = await this.getDistribution(guess);
        for (let answer of distribution.keys()){
            if (distribution.get(answer).length != 0){
                basket.push(distribution.get(answer).length);
            }
        }
        basket.sort(function(a, b){return a-b}).reverse();
        return basket;
    }

    async getAllBasketsAmount(guessField) {
        const baskets = new Map();        
        let nextStep = 10;
        progressBar.style.display = "inline";
        for (let i = 0; i < guessField.length; i++) {
            const amount = await this.getBasketsAmount(guessField[i]);
            baskets.set(guessField[i], amount);
            if (100 * i / guessField.length >= nextStep) {
                await setProgress(100 * i/ guessField.length);
                await delay(1);
                nextStep += 10;
            }
        }
        await setProgress(0);
        progressBar.style.display = "none";
        return baskets;
    }
    
    async getAmountTypes(baskets){
        const amounts = [];
        for (const basket of baskets.values()) {
            if (!amounts.includes(basket)) amounts.push(basket);
        }
        return amounts;
    }

    async getMinimalAmountType(amounts){
        let minimal = amounts[0];
        for (const amount of amounts) {
            const size = Math.min(minimal.length, amount.length)
            for (let i = 0; i < size; i++){
                if (minimal[i] > amount[i]) minimal = amount;
                break;
            }
        }
        return minimal;
    }

    async isEqual(array1, array2){
        if (array1.length !== array2.length) return false
        for (let i = 0; i < array1.length; i++){
            if (array1[i] !== array2[i]) return false;
            }
        return true;
    }

    async getOptimalList(guessField){
        const baskets = await this.getAllBasketsAmount(guessField);
        const amounts = await this.getAmountTypes(baskets);
        const minimalAmountType = await this.getMinimalAmountType(amounts);
        let optimalList = [];
        for (let [key, value] of baskets.entries()) {
            if (this.isEqual(value, minimalAmountType)) optimalList.push(key);
        }
        return optimalList;
    }
    
    chooseRandomGuess(guessList){
        return guessList[Math.floor(Math.random() * guessList.length)];
    }

    async getSecondGuessOptimising(guess, response, isList){
        let nextGuess = "";
        let distribution = await this.getDistribution(guess);
        let guessList = [];
        switch (response) {
            case 0:
                guessList = distribution.get(0);
                break;
            case 1:
                guessList = distribution.get(1);
                break;
            case 2:
                guessList = await this.getOptimalList(distribution.get(3));
                break;
            case 3:
                guessList = await this.getOptimalList(distribution.get(2));
                break;
            case 4:
                distribution = distribution.get(3).concat(distribution.get(13));
                guessList = await this.getOptimalList(distribution);
                break;
            case 10:
            case 11:
            case 12:
            case 30:
                guessList = distribution.get(20);
                break;
            case 13:
                distribution = distribution.get(3).concat(distribution.get(12), distribution.get(21));
                guessList = await this.getOptimalList(distribution);
                break;
            case 20:
            case 21:
                guessList = distribution.get(11);
                break;
            case 22:
                guessList = distribution.get(11).concat(distribution.get(12));
                break;
        }
        nextGuess = this.chooseRandomGuess(guessList);
        this.narrowDecisionsField(guess, response);
        if (isList) return guessList;
        return nextGuess;
    }

    async getNextGuess(guess, response){
        // const optimization = this._decisionsField.length == this._full.length;
        const optimization = this.getDecisionsField().length == this.getFull().length;
        let nextGuess;
        let guessList;
        if (optimization) {
            nextGuess = await this.getSecondGuessOptimising(guess, response);            
        } 
        else {
            this.narrowDecisionsField(guess, response);
            guessList = await this.getOptimalList(this._full);
            nextGuess = this.chooseRandomGuess(guessList);
        }
        return nextGuess;
    }

    async getGuessList(guess, response){
        const optimization = this.getDecisionsField().length == this.getFull().length;
        let guessList;
        if (optimization) {
            guessList = await this.getSecondGuessOptimising(guess, response, true);            
        } 
        else {
            this.narrowDecisionsField(guess, response);
            guessList = await this.getOptimalList(this._full);
        }
        return guessList;
    }

    getSecretCode() {
        return this.secretCode;
    }

    setSecretCode(secretCode) {
        this.secretCode = secretCode;
    }

    getFull() {
        return this._full;
    }

    getDecisionsField() {
        return this._decisionsField;
    }
}