// prompt("Player")
var player1 = Math.floor((Math.random() * 6)) + 1;
var player2 = Math.floor((Math.random() * 6)) + 1;
//                       game status changer
if (player1 === player2) {
    document.getElementsByTagName("img");
    var game_stat = document.lastElementChild.querySelector("body").getElementsByTagName("h2");
    game_stat[0].innerText = "Game tie";
}
if (player1 < player2) {

    var game_stat = document.lastElementChild.querySelector("body").getElementsByTagName("h2");
    game_stat[0].innerText = "Player 2 WINS";
}
if (player1 > player2) {
    
    var game_stat = document.lastElementChild.querySelector("body").getElementsByTagName("h2");
    game_stat[0].innerText = "Player 1 WINS";
}
//                       Dice Image changer
var diceFirstImageName="Dice_" +player1+".jpg";
var diceSecondImageName="Dice_" +player2+".jpg";

var diceFirstImageLocation="Images/"+diceFirstImageName
var diceSecondImageLocation="Images/"+diceSecondImageName
var imageslist=document.querySelectorAll("img");
imageslist[1].setAttribute("src",diceFirstImageLocation);
imageslist[2].setAttribute("src",diceSecondImageLocation);