
var btnList = document.querySelectorAll(".drum");
var btnListLength = btnList.length;
for (var i = 0; i < btnListLength; i++) {
  btnList[i].addEventListener("click", function () {
    playAgainsttheKey(this.innerHTML);
  })
}
document.addEventListener("keypress",function(event){
  playAgainsttheKey(event.key);
})
function playAgainsttheKey(Key){
  switch (Key) {
    case "w":
      // alert("clicked")
      var Crashs = new Audio("sounds/snare.mp3");
      Crashs.play();

      break;
    case "a":
      // alert("clicked")
      var tom_1 = new Audio("sounds/tom-1.mp3");
      tom_1.play();
      break;
    case "s":
      // alert("clicked")
      var tom_2 = new Audio("sounds/tom-2.mp3");
      tom_2.play();
      break;
    case "d":
      // alert("clicked")
      var tom_3 = new Audio("sounds/tom-3.mp3");
      tom_3.play();
      break;
    case "j":
      // alert("clicked")
      var tom_4 = new Audio("sounds/crash.mp3");
      tom_4.play();
      break;
    case "k":
      // alert("clicked")
      var audio = new Audio("sounds/snare.mp3");
      audio.play();
      break;
    case "l":
      // alert("clicked")
      var audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
      break;

    default:
      break;
  }
}