const buttonColors=["red","blue","yellow","green"];
let gamePattern=[];
let userClickedPattern=[];
let start=false;
let level=-1;
let received=0;
let j=0;

$(document).keydown(function(){
    if(start==false){
        start=true;
        console.log("started")
        nextSequence();
    }
});

$(".btn").on("click",function(){
            let userChosenColor=$(this).attr("id");
            if(gamePattern[j]!=userChosenColor && gamePattern.length>0){
                makeSound("wrong");
                restart();
            }
            makeSound(userChosenColor);
            animatePress(userChosenColor);
            if(gamePattern.length>0){
            j++;
            userClickedPattern.push(userChosenColor);
            if(j==gamePattern.length){
                j=0;
                userClickedPattern.length=0;
                nextSequence();
            }}
})

function nextSequence(){
    level=level+1;
    $("#level-title").text("Level "+level);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    blinkandSound(randomChosenColor);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function blinkandSound(ele){
    const boxToFlash="#"+ele;
    const lheight = $(boxToFlash).height();
    makeSound(ele);
    setTimeout(() => {
        $(boxToFlash).fadeIn();
        $(boxToFlash).fadeOut();
        $(boxToFlash).fadeIn();
        if ($(boxToFlash).height() !== 0) {
            $(boxToFlash).css('height', 
                              `${lheight}px`);
        }
    }, 300);
}

function makeSound(colorChosen){
    switch(colorChosen){
        case "blue":
            let audio1=new Audio("sounds/blue.mp3");
            audio1.play();
        break;
        case "green":
            let audio2=new Audio("sounds/green.mp3");
            audio2.play();
        break;
        case "red":
            let audio3=new Audio("sounds/red.mp3");
            audio3.play();
        break;
        case "yellow":
            let audio4=new Audio("sounds/yellow.mp3");
            audio4.play();
        break;
        case "wrong":
            let audio5=new Audio("sounds/wrong.mp3");
            audio5.play();
        break;
    }
}

function restart(){
    gamePattern.length=0;
    userClickedPattern.length=0;
    start=false;
    $("#level-title").text("Press A Key to Start");
    level=-1;
    j=0;
}