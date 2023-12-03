const readline = require('readline-sync')

let valeur
valeur = readline.question("Entrer une valeur :")
for (let i = 1; i <= valeur; i++) {
    if (i % 3 === 0  && i % 5 === 0){
        console.log("FIZZBUZZ")
    }else if(i % 3 === 0){
        console.log("FIZZ")
    }else if(i % 5 === 0){
        console.log("BUZZ")
    }else{
        console.log(i)
    }
}

