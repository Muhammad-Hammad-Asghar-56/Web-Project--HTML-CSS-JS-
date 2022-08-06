let Equation = "";
let operateAddInEquation=false;
$(".btn").click(function () {
    var userChosenBtn = $(this).attr("id");
    if (isNumber(userChosenBtn) || isOperates(userChosenBtn)) {
        console.log(userChosenBtn);
        Equation += (userChosenBtn);
    }
    else {
        isEditText(userChosenBtn);
    }
    updateEquation();
});
function isOperates(text) {
    if(text=='*' || text=='/' ||text=='-'||text=='+')
    {
        operateAddInEquation=true;
        return true;
    }
    return false;
}
function updateEquation() {
    $("#display").text(`${Equation}`);

}
function isEditText(text) {
    if (text == `AC`) { Equation = " " }
    if (text == `CE`) { Equation = Equation.substring(0, Equation.length - 1) };
}
function isNumber(text) {
    for (let i = 0; i < 10; i++) {
        if (i == text) {
            return true;
        }
    }
    return false;
}