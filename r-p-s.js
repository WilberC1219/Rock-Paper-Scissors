choices = ["rock", "paper", "scissors"]

function getComputerChoice(){
    //randomly get rock paper or scissors
    random_choice = choices[Math.floor(Math.random() * 3)];
    return random_choice
}


function playRound(playerSelection, computerSelection){
    //plays the round
    p1 = playerSelection.toLowerCase();
    p2 = computerSelection;
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

function game(player, computer){  
    let round_res = playRound(player, computer);
    
    return round_res;
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
    console.log("You chose:", player_choice);
    console.log("Computer chose:", computer_choice);

    //play game and get results
    const [game_msg, winner] = game(player_choice, computer_choice);

    //if there is no draw, then update the winner's score  
    if(winner !== "draw"){
        const score_element = document.querySelector(`span[name="${winner}-score"]`); 
        const update_score = document.createTextNode(Number(score_element.textContent) + 1);
        score_element.removeChild(score_element.firstChild)
        score_element.appendChild(update_score);
        console.log(`The winner is ${winner}, ${game_msg}`);
    }
    else{
        console.log(`The winner is ${winner}, ${game_msg}`);   
    }
}));


