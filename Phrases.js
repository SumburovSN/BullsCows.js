class Phrases {
    _language;
    _phrases;
    
    constructor(language){
        this._language = language;
        this._phrases = new Map([
            ["promptToGameMode", [
                "Choose game mode (1 - Comp vs User, other symbols - Comp vs Comp): ",
                "Выберите режим игры (1 — Компьютер против Пользователя, другие символы — Компьютер против Компьютера): ",
                "Sélectionner le mode de jeu(1 - Ordinateur contre Utilisateur, autres symboles - Ordinateur contre Ordinateur): ",
                "Spielmodus auswählen(1 – Computer vs. Benutzer, andere Symbole – Computer vs.Computer): ",
            ]],
            ["move", [
                "MOVE ",
                "ХОД ",
                "COUP ",
                "ZUG "
            ]],
            ["player1thinking", [
                "Player 1 is thinking...",
                "Игрок 1 думает...",
                "Le joueur 1 réfléchit...",
                "Spieler 1 denkt..."
            ]],
            ["player2thinking", [
                "Player 2 is thinking...",
                "Игрок 2 думает...",
                "Le joueur 2 réfléchit...",
                "Spieler 2 denkt..."
            ]],
            ["gameover", [
                "The game is over. Waiting for a new game to start.",
                "Игра закончена. Жду запуска новой игры.",
                "Jeu terminé. En attendant le lancement du nouveau jeu.",
                "Spiel vorbei. Warten auf die Veröffentlichung des neuen Spiels."
            ]],
            ["gamelog", [
                "For reference. Progress of the game.",
                "Справочно. Ход игры.",
                "Pour référence. Progression du jeu.",
                "Als Referenz. Spielfortschritt."
            ]],
            ["info", [
                "The game status will be here.",
                "Здесь будет статус игры.",
                "Le statut du jeu sera ici.",
                "Der Spielstatus wird hier angezeigt."
            ]],
            ["tableau", [
                "The progress of the game will be displayed here.",
                "Здесь будет отображаться ход игры.",
                "La progression du jeu sera affichée ici.",
                "Der Spielverlauf wird hier angezeigt."
            ]],
            // ["bulls", [
            //     "Bulls: ",
            //     "Быков: ",
            //     "Taureaux: ",
            //     "Bullen: "
            // ]],
            // ["cows", [
            //     "Cows: ",
            //     "Коров: ",
            //     "Vaches: ",
            //     "Kühe:"
            // ]],
            // ["player1guess", [
            //     "Player 1 guess: ",
            //     "Догадка Игрока 1: ",
            //     "Le joueur 1 devine: ",
            //     "Vermutung von Spieler 1: "
            // ]],
            // ["player2guess", [
            //     "Player 2 guess: ",
            //     "Догадка Игрока 2: ",
            //     "Le joueur 2 devine: ",
            //     "Vermutung von Spieler 2: "
            // ]],
            // ["player1response", [
            //     "Player 1 response: ",
            //     "Ответ Игрока 1: ",
            //     "Réponse du joueur 1: ",
            //     "Antwort von Spieler 1: "
            // ]],
            // ["player2response", [
            //     "Player 2 response: ",
            //     "Ответ Игрока 2: ",
            //     "Réponse du joueur 2: ",
            //     "Antwort von Spieler 2: "
            // ]],
            ["player1won", [
                "Player 1 won",
                "Выиграл Игрок 1",
                "Le joueur 1 a gagné",
                "Spieler 1 hat gewonnen"
            ]],
            ["player2won", [
                "Player 2 won",
                "Выиграл Игрок 2",
                "Le joueur 2 a gagné",
                "Spieler 2 hat gewonnen"
            ]],
            ["draw", [
                "Draw",
                "Ничья",
                "Match nul",
                "Unentschieden"
            ]],
            ["autoSecretCode", [
                "Your automatically generated guess number is ",
                "Ваше загаданное число, сгенерированное автоматически, равно ",
                "Votre numéro de supposition généré automatiquement est ",
                "Ihre automatisch generierte Ratezahl lautet "
            ]],
            ["promptToSecretCode", [
                "If you want to make a different wish, enter it here: ",
                "Если Вы хотите загадать другое, введите здесь: ",
                "Si vous souhaitez faire un souhait différent, indiquez-le ici: ",
                "Wenn Du einen anderen Wunsch äußern möchtest, gib ihn hier ein: ",
            ]],
            ["secretCode", [
                "Your guessed number is ",
                "Ваше загаданное число равно ",
                "Votre numéro deviné est ",
                "Ihre erratene Zahl ist "
            ]],
            ["calculateHint", [
                "Calculating a hint...",
                "Вычисляю подсказку...",
                "Calculer un indice...",
                "Einen Hinweis berechnen..."
            ]],
            ["hint", [
                "Clue: ",
                "Подсказка: ",
                "Indice: ",
                "Hinweis: "
            ]],
            ["promptForGuess", [
                "Enter your guess: ",
                "Введите Вашу догадку: ",
                "Entrez votre estimation: ",
                "Geben Sie Ihren Schätzwert ein: "
            ]],
            ["analyzing", [
                "Analyzing...",
                "Анализирую...",
                "En train d'analyser...",
                "Analysieren..."
            ]],
            ["incorrectInput", [
                "Incorrect input, try again",
                "Неверный ввод, попробуйте еще раз",
                "Entrée incorrecte, réessayez",
                "Falsche Eingabe, versuchen Sie es erneut"
            ]],
            ["somethingWrong", [
                "Something wrong. Please, input your guess number for verification: ",
                "Что-то не так. Пожалуйста, введите загаданное число для проверки: ",
                "Quelque chose ne va pas. Veuillez entrer le numéro masqué pour vérifier: ",
                "Irgendwas stimmt nicht. Bitte geben Sie zur Überprüfung die versteckte Nummer ein: "
            ]],
            ["errorInAnswer", [
                "Error in answer:",
                "Ошибка в ответе:",
                "Erreur dans la réponse:",
                "Fehler in der Antwort:"
            ]],
            ["errorInCode", [
                "The error in code for further correction...",
                "Ошибка в коде для дальнейшего исправления...",
                "L'erreur dans le code pour une correction supplémentaire...",
                "Der Fehler im Code zur weiteren Korrektur..."
            ]],
            ["rest", [
                "The search field contains: ",
                "В поле поиска осталось: ",
                "Le champ de recherche contient: ",
                "Das Suchfeld enthält: "
            ]],
            ["end", [
                "The game is interrupted",
                "Игра прерывается",
                "Le jeu est interrompu",
                "Das Spiel wird unterbrochen"
            ]],
        ])
    }

    getPhrase(name){
        return this._phrases.get(name)[this._language]
    }

    setLanguage(language){
        this._language = language;
    }

}