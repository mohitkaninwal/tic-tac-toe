
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup"); // Use querySelector for single elements
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8]
];

let xTurn = true;
let count = 0;

// Disable all buttons and show popup
const disableButtons = () => {
    btnRef.forEach((element) => element.disabled = true);
    popupRef.classList.remove("hide");
};

// Enable buttons and hide popup
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });

    popupRef.classList.add("hide");
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F615; <br> It's a Draw"; // Changed the emoji and message
};

// New game button event listener
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Restart button event listener
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        // Check if elements are filled and equal
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
            }
        }
    }
};

// Display X/O on button click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            // Display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            // Display O
            element.innerText = "O";
            element.disabled = true;
        }
        xTurn = !xTurn; // Toggle turns
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        winChecker();
    });
});

window.onload = enableButtons; // Call enableButtons when the page loads
