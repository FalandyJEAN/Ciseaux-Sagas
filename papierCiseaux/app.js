const readline = require('readline-sync')

let computerSelection,playerSelection,convertCase
let computerScore = 0
let playerScore = 0

const list = ["Roche","Papier","Ciseaux"]

function getComputerChoice(){
    computerSelection = list[Math.floor(Math.random() * list.length)]

    return computerSelection
}

convertCase = (selection) => selection.charAt(0).toUpperCase() + selection.slice(1).toLowerCase()


function getPlayerChoice(){
    playerSelection = convertCase(readline.question("Que choissisez vous? :"))

    while (!list.includes(playerSelection)){
        playerSelection = convertCase(readline.question("Choix invalide ! :"))
    }

    return playerSelection
}

function playRound(computerSelection, playerSelection) {
    console.log(`\nOrdinateur : ${computerSelection}`)
    console.log(`Joueur : ${playerSelection}`)

    if (computerSelection === playerSelection) {
        console.log(`${computerSelection} est egale a ${playerSelection}\nMatch nul.`)
        computerScore++
        playerScore++
    } else if (
        (computerSelection === "Ciseaux" && playerSelection === "Papier") ||
        (computerSelection === "Papier" && playerSelection === "Roche") ||
        (computerSelection === "Roche" && playerSelection === "Ciseaux")
    ) {
        console.log(`${computerSelection} bat ${playerSelection}\nVous avez perdu !`)
        computerScore++
    } else {
        console.log(`${playerSelection} bat ${computerSelection}\nVous avez gagné !`)
        playerScore++
    }

    console.log(`Scores :\nJoueur: ${playerScore}, Ordinateur: ${computerScore}\n`)

    return [computerSelection, playerSelection]
}


function game(){
    let round = 1;

    do {
        console.log(`******Jeu Roche - Papier - Ciseaux******`)
        console.log(`***Round : ${round}***`)

        computerSelection = getComputerChoice()
        playerSelection = getPlayerChoice()

        playRound(computerSelection, playerSelection)

        if (playerScore > computerScore) {
            console.log("Vous avez gagné le jeu !")
        } else if (playerScore < computerScore) {
            console.log("L'ordinateur a gagné le jeu !")
        } else {
            console.log("Le jeu est un match nul !")
        }

        if (playerScore === 5 || computerScore === 5) {
            break
        }

        round++

    } while (true)

}


game()