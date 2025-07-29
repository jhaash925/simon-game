let gameSeq = [];
let userSeq = [];

let btns= ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;
const h2 = document.querySelector("h2");
const startBtn = document.getElementById("start-btn");


let highScore = localStorage.getItem("highScore") || 0;
let highScoreDisplay = document.querySelector("#high-score");
highScoreDisplay.innerText = `High Score: ${highScore}`;

let isMuted = false;

// Load dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

startBtn.addEventListener("click", () => {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        startBtn.style.display = "none";
        h2.innerText = `Level ${level + 1}`;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randbtn);

    levelUpSound();
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000)
        }
    }else{
        playWrongSound();

        h2.innerHTML = `Game Over! Your score was <b>${level}</b>`;
        startBtn.innerText = "Restart Game";
        startBtn.style.display = "inline-block";

        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 150);


        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = `High Score: ${highScore}`;
}

        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    playClickSound();

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

document.getElementById("mute-btn").addEventListener("click", () => {
    isMuted = !isMuted;
    document.getElementById("mute-btn").textContent = isMuted ? "🔇" : "🔊";
});

function playClickSound() {
    if(!isMuted){
        let audio = new Audio("sounds/click.mp3.wav");
        audio.play();
    }
}

function playWrongSound() {
    if(!isMuted){
        let audio = new Audio("sounds/wrong.mp3.wav");
        audio.play();
    }
}

function levelUpSound() {
    if(!isMuted){
        let audio = new Audio("sounds/levelup.mp3.mp3");
        audio.play();
    }
}

document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});


window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    const game = document.getElementById("game");

    // Match loader theme with current mode
    if (document.body.classList.contains("dark-mode")) {
        loader.style.background = "#000";
        loader.style.color = "#fff";
    }

    // Fade out loader
    loader.classList.add("hide");

    // Show game after fade-out transition
    setTimeout(() => {
        loader.style.display = "none";
        game.style.display = "block";
    }, 800); // match with CSS transition time
});





