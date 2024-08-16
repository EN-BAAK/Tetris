//!  Registin Players
let players = JSON.parse(window.localStorage.getItem("TetrisPlayers")) || [],
    length = players.length,
    registList = document.querySelector(".login ul");
//! Var Of Inputs
let userName,
    gameLevel,
    submit = document.getElementById("submit"),
    emptyNameErr = document.querySelector(".login .err .err-empty"),
    sameNameErr = document.querySelector(".login .err .err-same");
//! Loading Page Set Players
players.forEach((e) => {
    window.localStorage.clear("TetrisPlayers");
    appendNewPlayer(e);
});
setNewPlayer();
//! Input User And Validate
addEventListener("input", (e) => {
    if (e.target.className === "input-name") {
        if (e.target.value == "") {
            submit.classList.add("dis");
            emptyNameErr.classList.add("show");
        } else {
            emptyNameErr.classList.remove("show");
            let accessibility = true;
            players.forEach((el) => {
                if (e.target.value == el.userName) {
                    accessibility = false;
                }
            });
            if (!accessibility) {
                submit.classList.add("dis");
                sameNameErr.classList.add("show");
            } else {
                submit.classList.remove("dis");
                sameNameErr.classList.remove("show");
            }
        }
    }
});
addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        if (!submit.classList.contains("dis")) {
            submit.click()
            e.preventDefault();
        }
    }
});
//! Delete Player
addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        deletePlayer(e.target);
    }
    if(e.target.classList.contains('name')) {
        id = e.target.parentElement.querySelector('.delete').getAttribute('id')
        var selectedPlayer = players.find(obj => obj.id === +id)
        var indexPlayer = players.indexOf(selectedPlayer)
        window.sessionStorage.setItem('TetrisPlayerIndex', indexPlayer)
        window.location.href = './game-main.html'
    }
});

//! Add New Player
submit.onclick = (_) => {
    gameLevel = document.querySelector('.login .player-level input:checked').value;
    userName = document.querySelector(".input-name").value;
    document.querySelector(".input-name").value = '';
    registNewPlayer(userName, gameLevel, 0);
    window.sessionStorage.setItem('TetrisPlayerIndex', players.length-1)
    window.location.href = './game-main.html'
};

//! Functions
//  Create Element
function bCreateElement(element, className, id, text) {
    var newElement = document.createElement(element);
    className !== null ? (newElement.className = className) : null;
    id !== null ? (newElement.id = id) : null;
    if (text !== null) {
        newElement.appendChild(document.createTextNode(text));
    }

    return newElement;
}
//?  Regiseting New Player

//  Add New Player To Array
function registNewPlayer(userName, level, points) {
    const player = {
        id: Math.ceil(Math.random() * 100),
        userName: userName,
        points: points,
        level: level,
    };
    players.push(player);
    //  Append New Element In The Page
    appendNewPlayer(player);
    //  Set New Element In Local Storage
    setNewPlayer();
}

//  Append New Element In The List
function appendNewPlayer(player) {
    let li = bCreateElement("li", null, null, null);
    var contentName = `<span class="name">${player.userName}</span>`,
        contentPoints = `<span class="points">${player.points}</span>`;
    contentLevel = `<span class="level">${player.level}</span>`;
    let button = bCreateElement("button", "delete", null, "Delete");
    button.setAttribute("id", player.id);
    li.innerHTML = contentName + contentPoints + contentLevel;
    li.appendChild(button);
    registList.appendChild(li);
}

//  Add New Player To The Storage
function setNewPlayer() {
    window.localStorage.setItem("TetrisPlayers", JSON.stringify(players));
}

//? Delete Players From List
function deletePlayer(e) {
    players.forEach((el, i) => {
        if (el.id == e.getAttribute("id")) {
            players.splice(i, 1);
            setNewPlayer();
            e.parentElement.parentElement.innerHTML = "";
        }
    });
    players.forEach((e) => {
        appendNewPlayer(e);
    });
}
