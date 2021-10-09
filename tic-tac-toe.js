/*
 * Didn't use an array because it could cause data inconsistency
 */

var lastSquare = "O";

function onclickSquare(event){
    let obj = this;
    let classLst = obj.classList;
    if(!(classLst.contains("X") || classLst.contains("O"))){
        if(lastSquare === "O"){
            classLst.add("X");
            obj.textContent = "X";
            lastSquare = "X";
        }
        else{
            classLst.add("O");
            obj.textContent = "O";
            lastSquare = "O";
        }
    }
}

window.onload = function() {
    let elementList= document.querySelectorAll("#board > div");
    Object.values(elementList).forEach((singleElement) =>  {
        let classLst = singleElement.classList;
        classLst.add("square");
        singleElement.addEventListener("click", onclickSquare);
    });
};
