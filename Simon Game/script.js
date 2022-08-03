let GameSequence = [];
let PlayerSequenece = [];
let playGame = false;
let timeToAdd = true;
let enablePlayerInput = true;
function addNewButton() {
    $("#level-title").text("Listen");
    let randomBtn = Math.floor(((Math.random()) * 4)) + 1;
    switch (randomBtn) {
        case 1:
            GameSequence.push("green");
            pressedBtn("green");
            break;
        case 2:
            GameSequence.push("red");
            pressedBtn("red");
            break;
        case 3:
            GameSequence.push("yellow");
            pressedBtn("yellow");
            break;
        case 4:
            GameSequence.push("blue");
            pressedBtn("blue");
            break;
        default:
            break;
    }
}
function pressedBtn(color) {
    $(`#${color}`).addClass("pressed");
    let colorSound = new Audio(`sounds/${color}.mp3`);
    colorSound.play();
    setTimeout(() => {
        $(`#${color}`).removeClass("pressed");
    }, 300);
}
function PlayerClick() {
    $("#level-title").text("Click");
    $(".green").click(() => {
        if (enablePlayerInput) {
            // alert("1");
            PlayerSequenece.push("green");
            pressedBtn("green");
            enablePlayerInput = false;
        }
    })
    $(".red").click(() => {
        // alert("2");
        if (enablePlayerInput) {
            PlayerSequenece.push("red");
            pressedBtn("red");
            enablePlayerInput = false;
        }
    })
    $(".yellow").click(() => {
        // alert("3");
        if (enablePlayerInput) {
            PlayerSequenece.push("yellow");
            pressedBtn("yellow");
            enablePlayerInput = false;
        }
    })
    $(`.blue`).click(() => {
        if (enablePlayerInput) {
            // alert("4");
            PlayerSequenece.push("blue");
            pressedBtn("blue");
            enablePlayerInput=false;
        }
    })
}
function checkInputStatus() {
    if (PlayerSequenece.length > 0 && GameSequence.length > 0) {
        if (PlayerSequenece.length <= GameSequence.length) {
            for (let index = 0; index < PlayerSequenece.length; index++) {
                // alert(`${GameSequence[${index}]}`);
                if (GameSequence[index] != PlayerSequenece[index]) {
                    wrongClick();
                    $("#level-title").text("End");
                    return false;
                }
            }
        }
    }
    return true;
}
function wrongClick() {
    $("level-title").text("Wrong CLick");
    let WrongSound = new Audio("sounds/wrong.mp3");
    WrongSound.play();
}
function resetGame() {
    GameSequence = [];
    PlayerSequenece = [];
}
function main() {
    //         start game
    if (!playGame) {
        $("body").keypress(function (e) {
            // console.log(e.key);
            if (e.key === "A" || e.key === "a") {
                playGame = true;
            }
        });
    }

    if (playGame) {//        add new button in sequnce if need
        if (timeToAdd) {
            addNewButton();
            timeToAdd = false;
        }
        //        if no btn need then check player inputs
        if (timeToAdd == false) {
            PlayerClick();
        }
        //                 check status
        if (checkInputStatus()) {
            console.log(PlayerSequenece);
            if (GameSequence.length === PlayerSequenece.length) {
                PlayerSequenece.length = 0;
                timeToAdd = true;
            }
            enablePlayerInput=true;
        }
        else {
            playGame = false;
        }
    }
}
setInterval(() => {
    main();
}, 500);