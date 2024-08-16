//!     Variables
//  Constant Value Of Game
const COLUMNCELLSNUMBER = 14,
    ROWCELLSNUMBER = 20,
    //  The Point Which Start Draw The Shape From It
    MAINCREATINGPOINT = 6;
//  Set LocalStorage Data
let dataIndex = window.sessionStorage.getItem("TetrisPlayerIndex"),
    dataArray = JSON.parse(window.localStorage.getItem("TetrisPlayers"));
const level = dataArray[dataIndex].level,
    playerName = dataArray[dataIndex].userName;
let playerPoints = dataArray[dataIndex].points;
//  HTML Varaibles
//  Elements Of Grid
let grid = document.querySelectorAll(".game-area .container .box"),
    //  Array Of Grid
    gridArray = Array.from(grid),
    //  Left Button
    leftButton = document.getElementById("left"),
    //  Right Button
    rightButton = document.getElementById("right"),
    //  Rotate Button
    rotateButton = document.getElementById("cycle"),
    //  Dash Button
    dashButton = document.getElementById("dash"),
    //  The Points Box
    pointsBox = document.getElementById("points-show"),
    //  The Level Box
    levelBox = document.getElementById("level-show"),
    //  The Layout Of The Finish Of The Game
    layout = document.getElementById("layout"),
    //  Set The Name Of Player
    userName = document.getElementById("username");
//  Main Variables Of JS
let speed = level == "Easy" ? 450 : level == "Medium" ? 250 : 100;
gift = level == "Easy" ? 3 : level == "Medium" ? 6 : 9;
//  To Allow The Player Control
allowControl = true;
//  Set The Name
userName.innerHTML = playerName;
//  Set The Value Of Points In The Box
pointsBox.innerHTML = playerPoints;
levelBox.innerHTML = level;
//!     Main
//  Add Click Event To The Game
document.addEventListener("click", (e) => {
    if (allowControl) {
        //  Click On The Left Button
        if (e.target == leftButton) {
            //  Let The Shape Move To Left
            leftMove();
        }
        //  Click On The Right Button
        if (e.target == rightButton) {
            //  Let The Shape Move To Right
            rightMove();
        }
        //  Click On The Rotate Button
        if (e.target == rotateButton) {
            //  Let THe Shape Rotate
            rotateShape();
        }
        //  CLick On The Dash Button
        if (e.target == dashButton) {
            //  Let The Shape Go Quicly To Bottom
            dash();
        }
    }
});
//  Add Keyboard Click Event To The Game
document.addEventListener("keypress", (e) => {
    if (allowControl) {
        //  Click On The Left Button
        if (e.code == "KeyA") {
            //  Let The Shape Move To Left
            leftMove();
        }
        //  Click On The Right Button
        if (e.code == "KeyD") {
            //  Let The Shape Move To Right
            rightMove();
        }
        //  Click On The Rotate Button
        if (e.code == "KeyR") {
            //  Let THe Shape Rotate
            rotateShape();
        }
        //  Click On The Dash Button
        if (e.code == "Space") {
            dash();
        }
    }
});
//  Start Game
createShape();
//!     Function
//  Create Shapes Randomly
function createShape() {
    allowControl = false;
    //  Check If The Row Completed
    rowComplete();
    //  Get Random Number To Create Random Shape
    var randomeNumber = Math.ceil(Math.random() * 7),
        //  To Set The Color Of Shape
        color;
    switch (randomeNumber) {
        case 1:
            color = "yellow";
            createYellowShape();
            break;
        case 2:
            color = "light-blue";
            createLightBlueShape();
            break;
        case 3:
            color = "green";
            createGreenShape();
            break;
        case 4:
            color = "blue";
            createBlueShape();
            break;
        case 5:
            color = "red";
            createRedShape();
            break;
        case 6:
            color = "orange";
            createOrangeShape();
            break;
        case 7:
            color = "violet";
            createVioletShape();
            break;
    }
    if (Collision()) {
        console.log("enter");
        return endGame();
    }
    dropDown(color);
}
//  Create The Square Shape (Yellow Shape)
function createYellowShape() {
    grid[MAINCREATINGPOINT].classList.add("yellow", "move");
    grid[MAINCREATINGPOINT + 1].classList.add("yellow", "move", "center");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER].classList.add("yellow", "move");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER + 1].classList.add(
        "yellow",
        "move"
    );
}
//  Create The Vertical Shape (Light Blue Shape)
function createLightBlueShape() {
    grid[MAINCREATINGPOINT].classList.add("light-blue", "move", "shape");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER].classList.add(
        "light-blue",
        "move",
        "center"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 2].classList.add(
        "light-blue",
        "move"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 3].classList.add(
        "light-blue",
        "move"
    );
}
//  Create The Stair Shape (Green Shape)
function createGreenShape() {
    grid[MAINCREATINGPOINT].classList.add("green", "move");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER].classList.add(
        "green",
        "move",
        "center"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER + 1].classList.add(
        "green",
        "move"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 2 + 1].classList.add(
        "green",
        "move"
    );
}
//  Create The Chair Shape (Blue Shape)
function createBlueShape() {
    grid[MAINCREATINGPOINT].classList.add("blue", "move");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER].classList.add(
        "blue",
        "move",
        "center"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 2].classList.add(
        "blue",
        "move"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 2 - 1].classList.add(
        "blue",
        "move"
    );
}
//  Create The Stair Shape (Red Shape)
function createRedShape() {
    grid[MAINCREATINGPOINT].classList.add("red", "move");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER].classList.add(
        "red",
        "move",
        "center"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER - 1].classList.add(
        "red",
        "move"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 2 - 1].classList.add(
        "red",
        "move"
    );
}
//  Create The Chair Shape (Orange Shape)
function createOrangeShape() {
    grid[MAINCREATINGPOINT].classList.add("orange", "move");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER].classList.add(
        "orange",
        "move",
        "center"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 2].classList.add(
        "orange",
        "move"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER * 2 + 1].classList.add(
        "orange",
        "move"
    );
}
//  Create The Pixel Shape (Violet Shape)
function createVioletShape() {
    grid[MAINCREATINGPOINT].classList.add("violet", "move");
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER].classList.add(
        "violet",
        "move",
        "center"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER + 1].classList.add(
        "violet",
        "move"
    );
    grid[MAINCREATINGPOINT + COLUMNCELLSNUMBER - 1].classList.add(
        "violet",
        "move"
    );
}
//  Drop The Shape Down
function dropDown(color) {
    setTimeout(() => {
        allowControl = true;
    }, speed);
    const time = setInterval(() => {
        //  The Shape The Move Down
        var shape = Array.from(
            document.querySelectorAll(".game-area .move")
        ).reverse();
        // console.log(nextCellsExist(shape))
        if (nextCellsExist(shape)) {
            downMove(shape, color);
        } else {
            setBlock(shape);
            clearInterval(time);
        }
    }, speed);
}
//  To Check If The Cells Under The Shape Can Visit
function nextCellsExist(shape) {
    var index;
    for (e of shape) {
        index = Array.from(grid).indexOf(e);
        if (
            grid[index + COLUMNCELLSNUMBER] === undefined ||
            grid[index + COLUMNCELLSNUMBER].classList.contains("block")
        ) {
            return false;
        }
    }
    return true;
}
//  To Set The Shape That Locate Bellow As A Block
function setBlock(arr) {
    arr.forEach((e) => {
        e.classList.remove("move", "center");
        e.classList.add("block");
    });
    createShape();
}
//  Move The Shape To Down
function downMove(arr, color) {
    dashPlaceholder();
    var arrayIndex = [],
        center = gridArray.indexOf(document.querySelector(".center"));
    arrayIndex = removeShape(arr, color);
    arr.forEach((e) => {
        for (var i in arrayIndex) {
            arrayIndex[i] == center
                ? grid[arrayIndex[i] + COLUMNCELLSNUMBER].classList.add(
                      color,
                      "move",
                      "center"
                  )
                : grid[arrayIndex[i] + COLUMNCELLSNUMBER].classList.add(
                      color,
                      "move"
                  );
        }
    });
}
//  Move The Shape To Left
function leftMove() {
    //  variables
    var shape = document.querySelectorAll(".game-area .move"),
        color = shape[0].classList[1],
        center = gridArray.indexOf(document.querySelector(".center")),
        arrayIndex = [];
    //  Check If The Shape Will Go Outside
    if (checkLeftMoveSafe(shape)) {
        arrayIndex = removeShape(shape, color);
        for (var i in arrayIndex) {
            arrayIndex[i] == center
                ? grid[arrayIndex[i] - 1].classList.add(color, "move", "center")
                : grid[arrayIndex[i] - 1].classList.add(color, "move");
        }
    }
    dashPlaceholder();
}
//  Move The Shape To Right
function rightMove() {
    //  variables
    var shape = document.querySelectorAll(".game-area .move"),
        color = shape[0].classList[1],
        center = gridArray.indexOf(document.querySelector(".center")),
        arrayIndex = [];
    //  Check If The Shape Will Go Outside
    if (checkRightMoveSafe(shape)) {
        arrayIndex = removeShape(shape, color);
        for (var i in arrayIndex) {
            arrayIndex[i] == center
                ? grid[arrayIndex[i] + 1].classList.add(color, "move", "center")
                : grid[arrayIndex[i] + 1].classList.add(color, "move");
        }
    }
    dashPlaceholder();
}
//  Remove The Shape And Set The Index
function removeShape(shape, color) {
    var array = [];
    shape.forEach((e) => {
        array.push(gridArray.indexOf(e));
        e.classList.remove("center", color, "move");
    });
    return array;
}
//  Check If It Will Go Outside Or Will Meet With Shape
function checkRightMoveSafe(arr) {
    var index;
    for (var e of arr) {
        index = gridArray.indexOf(e);
        if (
            (index % COLUMNCELLSNUMBER) + 1 >= COLUMNCELLSNUMBER ||
            grid[index + 1].classList.contains("block")
        ) {
            return false;
        }
    }
    return true;
}
//  Check If It Will Go Outside Or Will Meet With Shape
function checkLeftMoveSafe(arr) {
    var index;
    for (var e of arr) {
        index = gridArray.indexOf(e);
        if (
            (index % COLUMNCELLSNUMBER) - 1 < 0 ||
            grid[index - 1].classList.contains("block")
        ) {
            return false;
        }
    }
    return true;
}
//  Rotate The Shape
function rotateShape() {
    var shape = document.querySelectorAll(".game-area .move"),
        //  Get The Center Elment
        centerElement = document.querySelector(".center"),
        center = gridArray.indexOf(centerElement),
        color = shape[0].classList[1],
        //  To Set The Index Of Each Elemnt In The Shape
        arrayOfElement = [];
    if (checkRotateMoveSafe(shape, center)) {
        if (color !== "yellow") {
            shape.forEach((e) => {
                arrayOfElement.push(gridArray.indexOf(e));
                e.classList.remove(color, "move", "center");
            });
            for (var i in arrayOfElement) {
                var index = getIndexOfRotate(center, arrayOfElement[i]);
                index === center
                    ? grid[index].classList.add(color, "move", "center")
                    : grid[index].classList.add(color, "move");
            }
        }
    }
    dashPlaceholder();
}
//  Check If The Rotate Safe
function checkRotateMoveSafe(arr, center) {
    var arrArray = Array.from(arr);
    for (var i in arrArray) {
        var index = gridArray.indexOf(arrArray[i]);
        if ((index % 14) - 1 < 0 || (index % 14) + 1 >= COLUMNCELLSNUMBER) {
            console.log(false, index, index - 1, index + 1);
            return false;
        }
        index = getIndexOfRotate(center, index);
        if (
            grid[index] == undefined ||
            grid[index].classList.contains("block")
        ) {
            return false;
        }
    }
    return true;
}
//  Give Us The Index Of Element After Rotate
function getIndexOfRotate(center, eIndex) {
    var rC = Math.floor(center / COLUMNCELLSNUMBER),
        cC = center % 14,
        rP = Math.floor(eIndex / COLUMNCELLSNUMBER),
        cP = eIndex % 14,
        r = rP - rC,
        c = cP - cC,
        mainR = (rC + c) * COLUMNCELLSNUMBER,
        mainC = cC - r;
    return mainC + mainR;
}
//  Check If The Row Completed
function rowComplete() {
    var Completed = true;
    for (var i = 266; i >= 0; i -= COLUMNCELLSNUMBER) {
        Completed = true;
        innerLoop: for (var y = 0; y < 14; y++) {
            if (!grid[y + i].classList.contains("block")) {
                Completed = false;
                break innerLoop;
            }
        }
        if (Completed) {
            for (var z = 0; z < 14; z++) {
                var color = grid[z + i].classList[1];
                grid[z + i].classList.remove("block", color);
            }
            playerPoints += gift * 14;
            pointsBox.innerHTML = playerPoints;
            var fingrid = Array.from(
                document.querySelectorAll(".block")
            ).reverse();
            for (var ind in fingrid) {
                var color = fingrid[ind].classList[1],
                    index = gridArray.indexOf(fingrid[ind]);
                if (index < i) {
                    grid[index].classList.remove(color, "block");
                    grid[index + COLUMNCELLSNUMBER].classList.add(
                        color,
                        "block"
                    );
                }
            }
        }
    }
}
//  Check If The Shape Collisions With Block
function Collision() {
    var shape = Array.from(document.querySelectorAll(".move"));
    for (var i in shape) {
        if (shape[i].classList.contains("block")) {
            return true;
        }
    }
    return false;
}
//  The End Of Game
function endGame() {
    layout.classList.add("show");
    dataArray[dataIndex].points = playerPoints;
    window.localStorage.setItem("TetrisPlayers", JSON.stringify(dataArray));
    setTimeout(() => {
        location.href = "./index.html";
    }, 1500);
}
//  Let The Shape Go To The Bottom Quickly
function dash() {
    var shape = document.querySelectorAll(".move"),
        holder = document.querySelectorAll("[holder=true]"),
        color = shape[0].classList[1];
    removeShape(shape, color);
    holder.forEach((e) => {
        e.classList.add(color, "move");
    });
}
//  Show The Dash Placeholder
function dashPlaceholder() {
    var shapeHolder = document.querySelectorAll("[holder=true]") || null;
    if (shapeHolder !== null) {
        shapeHolder.forEach((e) => {
            e.setAttribute("holder", false);
        });
    }
    (shape = Array.from(document.querySelectorAll(".move"))),
        (reachEnd = false),
        (arrIndexes = []);
    for (i in shape) {
        var index = gridArray.indexOf(shape[i]);
        arrIndexes.push(index);
    }
    while (!reachEnd) {
        loop: for (var i in arrIndexes) {
            if (
                grid[arrIndexes[i] + COLUMNCELLSNUMBER] == undefined ||
                grid[arrIndexes[i] + COLUMNCELLSNUMBER].classList.contains(
                    "block"
                )
            ) {
                reachEnd = true;
                break loop;
            }
        }
        if (!reachEnd) {
            for (var i in arrIndexes) {
                arrIndexes[i] += COLUMNCELLSNUMBER;
            }
        }
    }
    for (i in arrIndexes) {
        grid[arrIndexes[i]].setAttribute("holder", true);
    }
}
//!     Template Functions
//  Create Element
const bCreateElement = function (element, className, id, text) {
    var newElement = document.createElement(element);
    className !== null ? (newElement.className = className) : null;
    id !== null ? (newElement.id = id) : null;
    if (text !== null) {
        newElement.appendChild(document.createTextNode(text));
    }

    return newElement;
};
