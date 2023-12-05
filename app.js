document.addEventListener("DOMContentLoaded", function () {
    const playerInput = document.querySelectorAll(".choix")
    const playerSon = document.getElementById("son1")
    const computerSon = document.getElementById("son2")
    const startSon = document.getElementById("son3")
    const winnerSon = document.getElementById("son4")
    const loseSon = document.getElementById("son5")
    const boutonDemarrer = document.getElementById("bouton")
    const jeuSection = document.getElementById("jeu")
    const resultatSection = document.querySelector(".resultat")
    const computerScoreDisplay = document.getElementById("computerScore")
    const playerScoreDisplay = document.getElementById("playerScore")
    const ecran = document.getElementById("ecran")
    const boutonRejouer = document.getElementById("bouton2")
    const notaBene = document.getElementById("notaBene")

    let computerSelection, playerSelection,computerImages,playerScore = 0, computerScore = 0
    const list = ["roche", "papier", "ciseaux"]

    boutonDemarrer.addEventListener("click", startGame)

    boutonRejouer.addEventListener("click", function () {
        playerScore = 0
        computerScore = 0
        computerScoreDisplay.innerText = "0"
        playerScoreDisplay.innerText = "0"
        resultatSection.style.display = "none"

        jeuSection.style.display = "block"
    })

    function startGame() {
        playSound3()
        boutonDemarrer.style.display = "none"
        jeuSection.style.display = "block"
        getPlayerChoice()
    }

    function getPlayerChoice() {
        playerInput.forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault()
                playerInput.forEach(function (otherLink) {
                    otherLink.style.border = "initial"
                })

                link.style.border = "4px solid green"
                playerSelection = this.getAttribute("alt")
                playSound1()

                //remove notabene
                setTimeout(function(){
                    notaBene.innerText = " "
                },100)

                setTimeout(function () {
                    computerSelection = getComputerChoice()
                    updateComputerChoiceBorder(computerSelection, playerSelection)
                    playSound2()
                    playRound(computerSelection, playerSelection)
                }, 500)
            })
        })
    }

    function getComputerChoice() {
        return list[Math.floor(Math.random() * list.length)]
    }

    function updateComputerChoiceBorder(computerSelection, playerSelection) {
        if (playerSelection) {
            computerImages = document.querySelectorAll(".computerSelection .img img")
            computerImages.forEach(function (image) {
                image.style.border = "none"
            })

            const computerChoiceImage = document.querySelector(
                `.computerSelection .img img[alt="${computerSelection}"]`
            )
            if (computerChoiceImage) {
                computerChoiceImage.style.border = "4px solid yellow"
            }
        }
    }

    function playRound(computerSelection, playerSelection) {
        if (computerSelection === playerSelection) {
            showResult(`${computerSelection} est egale a ${playerSelection} Match nul !`)
        } else if (
            (computerSelection === "ciseaux" && playerSelection === "papier") ||
            (computerSelection === "papier" && playerSelection === "roche") ||
            (computerSelection === "roche" && playerSelection === "ciseaux")
        ) {
            computerScore++;
            showResult(`${computerSelection} bat ${playerSelection} Vous avez perdu ce tour !`)
        } else {
            playerScore++
            showResult(`${playerSelection} bat ${computerSelection} Vous avez gagne ce tour !`)
        }

        computerScoreDisplay.innerText = computerScore
        playerScoreDisplay.innerText = playerScore

        if (playerScore === 5 || computerScore === 5) {
            endGame()
            showResult("")
            playerInput.forEach(function (otherLink) {
                otherLink.style.border = "initial"
            })
            computerImages.forEach(function (image) {
                image.style.border = "initial"
            })
        }
    }

    function showResult(result) {
        ecran.innerText = result
        ecran.style.color = "rgb(12, 81, 81)"
        ecran.style.paddingTop = "15px"
    }

    function endGame() {
        jeuSection.style.display = "none"
        resultatSection.style.display = "block"
        playSound3()
        
        resultatSection.lastChild.innerHTML = " "
        const resultElement = document.createElement("h4")
        if (playerScore > computerScore){
            resultElement.innerText = `Vous avez gagné!\n🏆`
            resultElement.style.textAlign = "center"
            playSound4()
        }else{
            resultElement.innerText = `Vous avez perdu!\n🥺`
            resultElement.style.textAlign = "center"
            playSound5()
        }
        resultatSection.appendChild(resultElement)
    }

    function playSound1() {
        playerSon.play()
    }

    function playSound2() {
        computerSon.play()
    }

    function playSound3() {
        startSon.play()
    }

    function playSound4() {
        winnerSon.play()
    }

    function playSound5() {
        loseSon.play()
    }
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope)
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
    })
}
  
navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload()
})
  