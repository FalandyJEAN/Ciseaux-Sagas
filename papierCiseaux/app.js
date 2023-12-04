let playerInput = document.querySelectorAll(".choix")
let son = document.getElementById("son")
let computerChooseRoche = document.getElementById("roche")
let computerChooseCiseaux = document.getElementById("ciseaux")
let computerChoosePapier = document.getElementById("papier")
let computerSelection,playerSelection,convertCase
const list = ["Roche","Papier","Ciseaux"]
let computerScore = 0
let playerScore = 0

function playSound(){
    son.play()
}

function getPlayerChoice(){
    playerInput.forEach(function(link){
        link.addEventListener("click",function(event){
            event.preventDefault()
            playerInput.forEach(function(otherLink){
                otherLink.style.border = "initial"
            })
    
            link.style.border = "4px solid green"
            playerSelection = this.getAttribute("data-text")
            playSound()
        })
    })
    return playerSelection
}

function getComputerChoice(){
    computerSelection = list[Math.floor(Math.random() * list.length)]
    if(computerSelection === computerChooseRoche){
        computerChooseRoche.style.border = "4px solid green"
    }else if(computerSelection === computerChooseCiseaux){
        computerChooseCiseaux.style.border = "4px solid green"
    }else if(computerSelection === computerChoosePapier){
        computerChoosePapier.style.border = "4px solid green"
    }

    return computerSelection
}

function playRound(computerSelection, playerSelection) {
    console.log(`\nOrdinateur : ${computerSelection}`)
    console.log(`Joueur : ${playerSelection}`)

    if (computerSelection === playerSelection) {
        console.log(`${computerSelection} est egale a ${playerSelection}\nMatch nul.`)
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


function demarrerJeu() {
    document.getElementById("bouton").style.display = "none"
    document.getElementById("boutonCSS").disabled = true
    
    document.getElementById("jeu").style.display = "block"
    playSound()
}