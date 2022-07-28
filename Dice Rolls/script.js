let player1Point=0;
let player2Point=0;

function initalizeGame()
{
    setPlayersName();
    resetScore(document.querySelectorAll(".score"));
    player1Point=0;
    player2Point=0;
    

}
function setPlayersName(){
    
    document.querySelector("#player_1Name").innerHTML=prompt("Enter the name of player 1 :");
    if(document.querySelector("#player_1Name").innerHTML===""){
        document.querySelector("#player_1Name").innerHTML="Player 1";
    }
    document.querySelector("#player_2Name").innerHTML=prompt("Enter the name of player 2 :");
    if(document.querySelector("#player_2Name").innerHTML===""){
        document.querySelector("#player_2Name").innerHTML="Player 2";
    }
}
function resetScore(scoreList) {    
    scoreList.forEach(element => {
        element.innerHTML="-";
    });
}
function PlayerGame() {

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
        player2Point++;
    }
    if (player1 > player2) {

        var game_stat = document.lastElementChild.querySelector("body").getElementsByTagName("h2");
        game_stat[0].innerText = "Player 1 WINS";
        player1Point++;
    }
    imgUpdater(player1,player2);
    updatePoints();
}
function updatePoints()
{
    document.querySelectorAll(".score")[0].innerHTML=player1Point;
    document.querySelectorAll(".score")[1].innerHTML=player2Point;
}
function imgUpdater(player1Dice,player2Dice)
{
    //                       Dice Image changer
    var diceFirstImageName = "Dice_" + player1Dice + ".jpg";
    var diceSecondImageName = "Dice_" + player2Dice + ".jpg";
    
    var diceFirstImageLocation = "Images/" + diceFirstImageName
    var diceSecondImageLocation = "Images/" + diceSecondImageName
    var imageslist = document.querySelectorAll("img");
    imageslist[1].setAttribute("src", diceFirstImageLocation);
    imageslist[2].setAttribute("src", diceSecondImageLocation);
}