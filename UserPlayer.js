class UserPlayer extends Player{
    // isCorrect(String guess){
    //     return getDecisionMaker().getFull().contains(guess);
    // }

    // @Override
    // public String nextGuess() {
    //     String guess;
    //     System.out.println(Colors.WHITE + getPhrase().get("calculateHint"));
    //     String hint = super.nextGuess();
    //     System.out.println(getPhrase().get("hint") + hint);
    //     BufferedReader r = new BufferedReader(new InputStreamReader(System.in));
    //     while (true) {
    //         try {
    //             System.out.println(getPhrase().get("promptForGuess"));
    //             guess = r.readLine();
    //             if (isCorrect(guess) && !isNumberInGameLog(guess)) break;
    //     //      Игрок хочет выйти
    //             if (Objects.equals(guess, "x") || Objects.equals(guess, "X")) break;
    //         } catch (Exception e) {
    //             System.out.println(e.getMessage());
    //         }
    //     }
    //     return guess;
    // }

    // private boolean isNumberInGameLog(String guess) {
    //     for (String[] entry: getGameLog()){
    //         if (Objects.equals(guess, entry[0])) return true;
    //     }
    //     return false;
    // }
}