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
        return ["You Win! Paper beats Rock", "player"]
    }
    else if(p1 == "rock" && p2 == "paper"){
        return ["You Lose! Paper beats Rock", "computer"]
    }
    else if(p1 == "rock" && p2 == "scissors"){
        return ["You Win! Rock beats Scissors", "player"]
    }
    else if(p1 == "scissors" && p2 == "rock"){
        return ["You Lose! Rock beats Scissors", "computer"]
    }
    else if(p1 == "scissors" && p2 == "paper"){
        return ["You Win! Scissors beats paper", "player"]
    }
    else if(p1 == "paper" && p2 == "scissors"){
        return ["You Lose! Scissors beats paper", "computer"]
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
    console.log("-------game end-------")
}));

//store all icon names and associate them with a icon 
const icon_map = new Map();
btn_options.forEach((node) => {
    icon_map.set(node.value, node.textContent);
});



