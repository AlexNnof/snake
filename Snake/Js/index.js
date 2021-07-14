const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start")
const scoreDisplay = document.getElementById("score")
const heighscoreDisplay = document.getElementById("heighscore")
let squares =[]
let currentSnake = [2,1,0]
let direction = 1
const width = 140 
const height = 73 
const time = 200
let fishIndex = 0
let score = 0
let intervalTime = time
let timerId = 0
let fishes = []
let trail = []
let heighscoreNr = window.localStorage

const div = "div"


function crateGrid(){
    
    //14400 divs

    for (let i = 0; i < width * height; i++) {
        const square = document.createElement("div")

        square.classList.add()

        square.classList.add(div + i)
        
        grid.appendChild(square)

        squares.push(square)

    }

    
}
crateGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function restart(e){
    if(e.key === "space"){
        startGame()
    }
}

function startGame(){

    currentSnake.forEach(index => squares[index].classList.remove('snake'))

    fishes.forEach(i => squares[i].classList.remove("fish"))

    clearInterval(timerId)

    currentSnake = [2,1,0]

    if(localStorage.getItem("heighscore") <= score){
        heighscoreNr = localStorage.setItem("heighscore", score)
    }

    heighscoreDisplay.textContent = localStorage.getItem("heighscore")

    score = 0

    scoreDisplay.textContent = score

    direction = 1

    intervalTime = time

    generatefish()

    trail.forEach(index => squares[index].classList.remove("trail"))

    trail = []

    randomSpawn = setInterval(generatefish, 60000) 

    currentSnake.forEach(index => squares[index].classList.add('snake'))

    timerId = setInterval(move, intervalTime)
}


function move(){

    if( (currentSnake[0] + width >= width * height && direction === width) || 
    (currentSnake[0] - width <= 0 && direction === -width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    squares[currentSnake[0] +direction].classList.contains('snake')

    ){
        fishes.forEach(i => squares[i].classList.remove("fish"))

        currentSnake.forEach(index => squares[index].classList.add('ghost'))

        currentSnake.forEach(index => squares[index].classList.remove('snake'))

        clearInterval(randomSpawn)

        trail.forEach(index => squares[index].classList.add("trail"))

        return clearInterval(timerId) 
    }

    const tail = currentSnake.pop()

    squares[tail].classList.remove("snake")

    trail.push(tail)

    currentSnake.unshift(currentSnake[0] + direction)

    if(squares[currentSnake[0]].classList.contains("fish")){

        squares[currentSnake[0]].classList.remove("fish")

        squares[currentSnake[0]].classList.add["snake"]

        currentSnake.push(tail)

        generatefish()

        score++

        scoreDisplay.textContent = score

        clearInterval(timerId)

        if(intervalTime >= 5){
            intervalTime = intervalTime - 5
        }

        timerId = setInterval(move, intervalTime)

    }

    squares[currentSnake[0]].classList.add('snake')
}   

function control(e){
    if (e.key === "a" || e.key === "ArrowLeft" ){ 

        console.log("left")

        direction = -1

    }else if (e.key === "w" || e.key === "ArrowUp" ){ 

        console.log("up")

        direction = -width

    }else if (e.key === "d" || e.key === "ArrowRight" ){ 

        console.log("right")

        direction = 1

    }else if (e.key === "s" || e.key === "ArrowDown" ){ 

        console.log("down")

        direction = width 

    }

    console.log(e.key)
}

function generatefish(){
    do{

        let fishN = Math.floor(Math.random()* (width * height))

        fishIndex = fishN

        fishes.push(fishN)

    }while(squares[fishIndex].classList.contains("snake") || 
    (squares[fishIndex] + width >= width * height) ||
    (squares[fishIndex] - width <= 0) ||
    (squares[fishIndex] % width === width - 1) ||
    (squares[fishIndex] % width === 0)
    )

    squares[fishIndex].classList.add("fish")

}


window.addEventListener("keydown", control)

startBtn.addEventListener("click", startGame)

window.addEventListener("keydown", restart)