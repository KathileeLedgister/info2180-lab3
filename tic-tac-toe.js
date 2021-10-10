/*
 * Didn't use an array because it could cause data inconsistency
 */

var lastSquare = "O";
var gameOver = false;
var originalStatusMsg = "";

function onclickSquare(event){
    do{
        if(gameOver)
            break;

        let obj = this;
        let classLst = obj.classList;
        if(!(classLst.contains("X") || classLst.contains("O"))){
            lastSquare=(lastSquare === "O"? "X":"O");
            classLst.add(lastSquare);
            obj.textContent = lastSquare;

            let nRow = obj.getAttribute("data-row");
            if(document.querySelectorAll("#board > div[data-row='"+nRow+"']."+lastSquare).length === 3){
                let statusBar = document.getElementById("status");
                classLst = statusBar.classList;
                classLst.add("status", "you-won");
                statusBar.textContent = "Congratulations! " +lastSquare+" is the Winner!";
                gameOver=true;
            }
        }
    }while(false);
}

function onmouseEnter(event){
    let obj = this;
    let classLst = obj.classList;
    classLst.add("hover");
}

function onmouseOut(event){
    let obj = this;
    let classLst = obj.classList;
    classLst.remove("hover");
}

window.onload = function() {
    let elementList= document.querySelectorAll("#board > div");
    Object.values(elementList).forEach((singleElement, index) =>  {
        let classLst = singleElement.classList;
        classLst.add("square");
        singleElement.addEventListener("click", onclickSquare);
        singleElement.addEventListener("mouseenter", onmouseEnter);
        singleElement.addEventListener("mouseout", onmouseOut);
        singleElement.setAttribute("data-row", Math.floor(index/3));
        let statusBar = document.getElementById("status");
        originalStatusMsg = statusBar.textContent;
    });
};


