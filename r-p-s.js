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
    console.log(`Player: ${p1}, computer ${p2}`);
    if(p1 == "paper" && p2 == "rock"){
        p_score++;
        return "You Win! Paper beats Rock"
    }
    else if(p1 == "rock" && p2 == "paper"){
        c_score++;
        return "You Lose! Paper beats Rock"
    }
    else if(p1 == "rock" && p2 == "scissors"){
        p_score++;
        return "You Win! Rock beats Scissors"
    }
    else if(p1 == "scissors" && p2 == "rock"){
        c_score++;
        return "You Lose! Rock beats Scissors"
    }
    else if(p1 == "scissors" && p2 == "paper"){
        p_score++;
        return "You Win! Scissors beats paper"
    }
    else if(p1 == "paper" && p2 == "scissors"){
        c_score++;
        return "You Lose! Scissors beats paper"
    }

    return "Its a draw!"
}


let p_score = 0;
let c_score = 0;
function game(){  
    for(let i = 0; i < 5; i++){
        const player = prompt("Enter rock paper or scissors.");
        const computer = getComputerChoice(); 
        console.log(`current: Your score ${p_score} \n Computer's score ${c_score}`);
        console.log(playRound(player, computer));
        
    }

    console.log(`Final: Your score ${p_score} \n Computer's score ${c_score}`);
    if(p_score === c_score){
        return "Its a tie!";
    }
    else if (p_score > c_score){
        return "You beat the computer!";
    }

    return "The computer wins!";
}
console.log(game());