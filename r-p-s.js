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
        return "You Win! Paper beats Rock"
    }
    else if(p1 == "rock" && p2 == "paper"){
        return "You Lose! Paper beats Rock"
    }
    else if(p1 == "rock" && p2 == "scissors"){
        return "You Win! Rock beats Scissors"
    }
    else if(p1 == "scissors" && p2 == "rock"){
        return "You Lose! Rock beats Scissors"
    }
    else if(p1 == "scissors" && p2 == "paper"){
        return "You Win! Scissors beats paper"
    }
    else if(p1 == "paper" && p2 == "scissors"){
        return "You Lose! Scissors beats paper"
    }

    return "Its a draw!"
}

function game(player, computer){  
    console.log(playRound(player, computer));    
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

    //play and print round result
    game(player_choice, computer_choice);
}));
