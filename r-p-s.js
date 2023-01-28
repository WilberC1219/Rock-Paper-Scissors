choices = ["rock", "paper", "scissors"]



/** 
 * This function randomly generates a choice for the computer.
 * where all 3 choices, rock paper and scissors have an equal chance of being selected.
 * 
 * @return {random_choice} - the string "rock", "paper", "scissors", which represents
 * the computer's selection.
 */
function getComputerChoice(){
    //randomly get rock paper or scissors
    random_choice = choices[Math.floor(Math.random() * 3)];
    return random_choice
}


/** 
 * This function simulates the game being played between both the human player and
 * the computer.
 * 
 * @param {player_choice} - either string "rock", "paper", "scissors"
 * @param {computer_choice} - either string "rock", "paper", "scissors"
 * 
 * @return {[game-msg, winner]} - an array of size 2. Where game-msg is the rounds
 * result message, and winner is the string "player" or "computer" which indicates who won.
 * Note: Does not account for invalid parameter situation
 */
function playRound(player_choice, computer_choice){
    //plays the round
    p1 = player_choice.toLowerCase();
    p2 = computer_choice;
    if(p1 == "paper" && p2 == "rock"){
        return ["You won the round! Paper beats Rock", "player"]
    }
    else if(p1 == "rock" && p2 == "paper"){
        return ["You lost the round! Paper beats Rock", "computer"]
    }
    else if(p1 == "rock" && p2 == "scissors"){
        return ["You won the round! Rock beats Scissors", "player"]
    }
    else if(p1 == "scissors" && p2 == "rock"){
        return ["You lost the round! Rock beats Scissors", "computer"]
    }
    else if(p1 == "scissors" && p2 == "paper"){
        return ["You won the round! Scissors beats paper", "player"]
    }
    else if(p1 == "paper" && p2 == "scissors"){
        return ["You lost the round! Scissors beats paper", "computer"]
    }

    return ["Its a draw!", "draw"]
}


/** 
 * This function plays the game for 5 rounds and determines whos the winner.
 * The winner is the one who wins 3/5 rounds.
 * 
 * @param {player_choice} - either string "rock", "paper", "scissors"
 * @param {computer_choice} - either string "rock", "paper", "scissors"
 * Note: Does not account for invalid parameter situation
 */
function game(player_choice, computer_choice){  
    const [game_msg, winner] = playRound(player_choice, computer_choice);
    let res_msg = ""
    //if there is no draw, then update the winner's score
    if(winner !== "draw"){
        updateScore(winner);
        console.log(`${game_msg}`);
        res_msg = `${game_msg}`
    }
    else{
        console.log(`${game_msg}`);   
        res_msg = `${game_msg}`
    }

    //after the game has been played, update the game-log.
    updateGameLog(player_choice, computer_choice, res_msg);
}

/** 
 * This function updates the game-log section: particularly the player-choice labels
 * and the game-msg section
 * 
 * @param {player_choice} - either string "rock", "paper", "scissors"
 * @param {computer_choice} - either string "rock", "paper", "scissors"
 * @param {result_message} - string that states who won/lost and states what choice beat the other
 * Note: Does not account for invalid parameter situation
 */
function updateGameLog(player_choice, computer_choice, result_message){
    //updates the game-log section, the player-choice labels
    
    const [player, computer] = document.querySelectorAll(`label[name="player-choice"]`);
    const player_icon = document.createTextNode(icon_map.get(player_choice));
    const computer_icon = document.createTextNode(icon_map.get(computer_choice)); 
    player.removeChild(player.firstChild);
    computer.removeChild(computer.firstChild);
    player.appendChild(player_icon);
    computer.appendChild(computer_icon);

    //updates the game-log section, the game-msg text
    const game_message = document.querySelector(`p[name="game-msg"]`);
    const message_node = document.createTextNode(result_message);
    game_message.removeChild(game_message.firstChild);
    game_message.appendChild(message_node);
}



/** 
 * This function updates the winner's score
 * 
 * @param {winner} - either string "player" or computer
 * Note: Does not account for invalid parameter situation
 */
function updateScore(winner){
    //updates the winner's score
    const score_element = document.querySelector(`span[name="${winner}-score"]`); 
    const update_score = document.createTextNode(Number(score_element.textContent) + 1);
    score_element.removeChild(score_element.firstChild)
    score_element.appendChild(update_score);
}


/**
 *  The checkForWinner function will determine if there
 *  is a winner who has won 3 rounds out of 5. 
 * 
 * @return return 0 if neither have won 3 out of 5 yet
 * @return return 1 if the human player won
 * @return return 2 if the computer won 
 */
function checkForWinner(){
    //get the scores of both computer and player
    const player_score = document.querySelector(`span[name="player-score"]`);
    const computer_score = document.querySelector(`span[name="computer-score"]`);
    console.log(`player has: ${Number(player_score.textContent)}`);
    console.log(`computer has: ${Number(computer_score.textContent)}`);

    //if anyones score reaches 3/5, they are automatically the winner
    if(Number(player_score.textContent) / 5 >= (3/5)){
        //player is the winner
        return 1;
    }
    else if(Number(computer_score.textContent) / 5 >= (3/5)){
        //computer is the winner
        return 2;
    }
    //no winner yet
    return 0;
}


/**
 * The displayPlayAgain will add display the "play again" button onto the screen
 * once there is a winner between the computer and the human player
 */
function displayPlayAgain(){
    //create button and add class 
    const play_again_btn = document.createElement("button")
    play_again_btn.classList.add("play-again");
    const play_again_text = document.createTextNode("Play again");

    //add redirect attribute to the button
    play_again_btn.addEventListener("click",  () => location.reload());

    //append the text to the button
    play_again_btn.appendChild(play_again_text);

    //add button to the main container
    const player_containers = document.getElementById(`main-container`);
    player_containers.appendChild(play_again_btn);
}


/**
 * The clearMainContainer will remove all the nodes that exist in the 
 * main html tag element of the page
 */
function clearMainContainer(){
    const main_container = document.getElementById(`main-container`);
    
    while(main_container.firstChild){
        main_container.removeChild(main_container.firstChild);
    }
}

/**
 * The gameOver function generates the end game screen
 * 
 * @param {end_message}- end_message, the final message after a player
 * has won 3 out of 5 rounds 
 */
function gameOver(end_message){
    //clear main container
    clearMainContainer();

    //add end message
    const main_container = document.getElementById(`main-container`);
    const end_message_node = document.createElement("h2");
    end_message_node.appendChild(document.createTextNode(end_message));
    main_container.appendChild(end_message_node);

    //add play again button
    displayPlayAgain();
}



//get all buttons on the page
const btn_options = document.querySelectorAll("button");

//add event listener to all the buttons. (rock, paper, scissors)
btn_options.forEach((btn) => btn.addEventListener('click', (e) =>{

    //player clicked a button, get their choice
    const player_choice = e.target.attributes.value.nodeValue;
    
    //generate computer's choice
    const computer_choice = getComputerChoice();

    //print both players choices
    console.log("-------game start-------")
    console.log("You chose:", player_choice);
    console.log("Computer chose:", computer_choice);

    //play game
    game(player_choice, computer_choice);

    //check to see who won 3/5 
    const win_num = checkForWinner();
    if(win_num == 1){
        console.log(`congratulations you won, you beat the computer 3 rounds out of 5!`);
        gameOver(`congratulations you won, you beat the computer 3 rounds out of 5!`);
    }
    else if(win_num == 2){
        console.log(`You lost the game, the computer beat you 3 rounds out of 5 :(`);
        gameOver(`You lost the game, the computer beat you 3 round out of 5 :(`);
    }
    else{
        console.log(`Neither you or computer have reached 3/5 wins`);
    }
    console.log("-------game end-------")
}));

//store all icon names and associate them with a icon 
const icon_map = new Map();
btn_options.forEach((node) => {
    icon_map.set(node.value, node.textContent);
});



