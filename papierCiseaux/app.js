let playerInput = document.querySelectorAll(".choix")
let playerSon = document.getElementById("son1")
let computerSon = document.getElementById("son2")
let startSon = document.getElementById("son3")
let computerChooseRoche = document.getElementById("roche")
let computerChooseCiseaux = document.getElementById("ciseaux")
let computerChoosePapier = document.getElementById("papier")
let resultat = document.getElementById("resultat")
let computerSelection,playerSelection
const list = ["roche","papier","ciseaux"]
let computerScore = 0
let playerScore = 0

function getPlayerChoice(){
    playerInput.forEach(function(link){
        link.addEventListener("click",function(event){
            event.preventDefault()
            playerInput.forEach(function(otherLink){
                otherLink.style.border = "initial"
            })
    
            link.style.border = "4px solid green"
            playerSelection = this.getAttribute("alt")
            playSound1()

            setTimeout(function () {
                const computerSelection = getComputerChoice()
                updateComputerChoiceBorder(computerSelection, playerSelection)
                playSound2()
            }, 500)

        })
    })
    return playerSelection
}

function getComputerChoice() {
    return list[Math.floor(Math.random() * list.length)]
}

function updateComputerChoiceBorder(computerSelection, playerSelection) {
    if (playerSelection) {
        const computerImages = document.querySelectorAll(".computerSelection .img img")
        computerImages.forEach(function (image) {
            image.style.border = "none"
        })

        const computerChoiceImage = document.querySelector(`.computerSelection .img img[alt="${computerSelection}"]`)
        if (computerChoiceImage) {
            computerChoiceImage.style.border = "4px solid red"
        }
    }
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

function playSound1(){
    playerSon.play()
}

function playSound2(){
    computerSon.play()
}

function playSound3(){
    startSon.play()
}

function game() {
    let round = 1

    do {
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

    document.getElementById("bouton").style.display = "none"
    document.getElementById("boutonCSS").disabled = true
    
    document.getElementById("jeu").style.display = "block"
    playSound3()
}
