/*
 * Didn't use an array because it could cause data inconsistency
 */

//We start with an 'O' so that we always know the state.
var lastSquare = "O";
var gameOver = false;
var originalStatusMsg = "";

/* Let's the player place an 'X' or 'O'
 * on the board, when a square is clicked.
 */
function onclickSquare(event){
    do{
        //Ignore clicks if game is over.
        if(gameOver)
            break;

        let obj = this;
        let classLst = obj.classList;

        /* The first letter placed is an 'X'.
         * If the player places 3 'X''s or 'O''s
         * in a row then they win and no other player
         * can place a letter.
         */
        if(!(classLst.contains("X") || classLst.contains("O"))){
            lastSquare=(lastSquare === "O"? "X":"O");//Places the first letter as an 'X' and the next letter as an 'O'.
            classLst.add(lastSquare);
            obj.textContent = lastSquare;

            /* Get the row in which the square was clicked.
             *
             */
            let nRow = obj.getAttribute("data-row");

            /*
             * Since only the last square played cause a win
             * and only the row with the last square played
             * can be won we only need to check this row from the board
             * and the type of the last square played,
             * whether 'X' or 'O'. If the number of divs with
             * 'X' or 'O' in the row equals 3, the player has won.
             */
            if(document.querySelectorAll("#board > div[data-row='"+nRow+"']."+lastSquare).length === 3){
                let statusBar = document.getElementById("status");
                classLst = statusBar.classList;
                classLst.add("status", "you-won");
                //lastSquare contains the winner type.
                statusBar.textContent = "Congratulations! " +lastSquare+" is the Winner!";
                //Game is over. Allow no more clicks.
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

/*
 * Resets the game to the default view at the start*/
function onclickNewButton(event){

      /*
     * Find all the divs on the board.
     * Process them one at a time.
     * Remove all the classes from them.
     */
    let elementList= document.querySelectorAll("#board > div");
    Object.values(elementList).forEach((singleElement, index) =>  {
        let classLst = singleElement.classList;
        classLst.remove("X", "O");
        singleElement.textContent = "";
    });
    let statusBar = document.getElementById("status");
    statusBar.textContent = originalStatusMsg;//Restore the original message

    let classLst = statusBar.classList;
    classLst.remove("status", "you-won");

    //This is a new game
    gameOver=false;
    lastSquare="O";
}

window.onload = function() {
    /*
     * Find all the divs on the board. They will
     * become the squares. Process them one at a time.
     */
    let elementList= document.querySelectorAll("#board > div");
    /*
     * The querySelector returns a list of 'div' elements.
     * Use 'Object.values' combined with 'forEach'
     * to extract the individual 'div' elements from the list.
     */
    Object.values(elementList).forEach((singleElement, index) =>  {
        let classLst = singleElement.classList;
        classLst.add("square");
        singleElement.addEventListener("click", onclickSquare);
        singleElement.addEventListener("mouseenter", onmouseEnter);
        singleElement.addEventListener("mouseout", onmouseOut);

        /* Set the row number of the div so
         * we can use it later.
         */
        singleElement.setAttribute("data-row", Math.floor(index/3));
    });
    let statusBar = document.getElementById("status");
    //Save the original status message so we can use it later.
    originalStatusMsg = statusBar.textContent;

    let newButton = document.querySelector("button.btn");
    newButton.addEventListener("click", onclickNewButton);
};


