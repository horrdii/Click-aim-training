const colors = ['b02323', '3360d4', '35d433', 'd1d433']
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
var intervId;
var color;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame(){
    setTime(time)
    intervId = setInterval(decreaseTime, 1000)
    timeEl.parentNode.classList.remove('hide')
    createRandomCircle()
}

function decreaseTime(){
    if(time === 0){
        finishGame()
        clearInterval(intervId)
    }else{
        let current = --time
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value < 10 ? '0' : ''}${value}`
}

function finishGame(){
    board.innerHTML = `<div><h1>Score: <span style="color: ${color}">${score}</span></h1></div>
                        <div><button class="play-again" id="play-again"><h3>Play again</h3></button></div>`
    timeEl.parentNode.classList.add('hide')
    board.classList.add('score')
    const playAgainBttn = document.querySelector("#play-again")
    playAgainBttn.style.background = color
    playAgainBttn.addEventListener('click', event => {
        retryGame()
    })
}

function retryGame(){
    screens[1].classList.remove('up')
    board.classList.remove('score')
    time = 1
    board.innerHTML = ''
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(60, 10)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(size, width-size)
    const y = getRandomNumber(size, width-size)
    color = `#${colors[getRandomNumber(0, colors.length)]}`

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px` 
    circle.style.left = `${x}px`
    circle.style.background = color

    board.append(circle)
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max-min) + min)
}