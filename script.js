/*
██████╗░██╗░░░██╗  ░█████╗░██████╗░░█████╗░██████╗░░██████╗██╗░░██╗
██╔══██╗╚██╗░██╔╝  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██║░░██║
██████╦╝░╚████╔╝░  ███████║██║░░██║███████║██████╔╝╚█████╗░███████║
██╔══██╗░░╚██╔╝░░  ██╔══██║██║░░██║██╔══██║██╔══██╗░╚═══██╗██╔══██║
██████╦╝░░░██║░░░  ██║░░██║██████╔╝██║░░██║██║░░██║██████╔╝██║░░██║
╚═════╝░░░░╚═╝░░░  ╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝

██████╗░░█████╗░████████╗██╗░░██╗░█████╗░██╗░░██╗░░░  ██████╗░░█████╗░██████╗░░░███╗░░░░░
██╔══██╗██╔══██╗╚══██╔══╝██║░░██║██╔══██╗██║░██╔╝░░░  ╚════██╗██╔══██╗╚════██╗░████║░░░░░
██████╔╝███████║░░░██║░░░███████║███████║█████═╝░░░░  ░░███╔═╝██║░░██║░░███╔═╝██╔██║░░░░░
██╔═══╝░██╔══██║░░░██║░░░██╔══██║██╔══██║██╔═██╗░██╗  ██╔══╝░░██║░░██║██╔══╝░░╚═╝██║░░░░░
██║░░░░░██║░░██║░░░██║░░░██║░░██║██║░░██║██║░╚██╗╚█║  ███████╗╚█████╔╝███████╗███████╗██╗
╚═╝░░░░░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░╚╝  ╚══════╝░╚════╝░╚══════╝╚══════╝╚═╝

Reach out -> pathak[dot]adarsh[at][gmail][dot-com]

NOTE: This codebase can be further optimised. Apologies for violating `DRY` principle.
*/


// Some declarations/constants.
const arr = new Array(4).fill(0).map(() => new Array(4).fill(0));
const winning_score = 128;
const win_message = "You have Won!";
const lose_message = "Game Over."
var current_score = 0;
var best_score = 0;
var has_won = false;
var has_lost = false;


function inc_score(score) {
    current_score += score;
}

function add_right(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let ctr = 0;

    for (let j = 0; j < rows; j++) {
        for (let i = cols - 1; i >= 0; i--) {
            if (arr[j][i] > 0) {
                if (i != 0 && arr[j][i] == arr[j][i - 1]) {
                    ctr = arr[j][i - 1];
                    arr[j][i] += ctr;
                    inc_score(arr[j][i]);
                    arr[j][i - 1] -= ctr;
                    ctr = 0;
                } else if (i != 0 && arr[j][i - 1] == 0) {
                    let itr = i - 1;
                    while (itr != 0 && arr[j][itr] == 0) itr -= 1;
                    if (arr[j][itr] == arr[j][i]) {
                        arr[j][i] += arr[j][itr];
                        inc_score(arr[j][i]);
                        arr[j][itr] = 0;
                        i = itr;
                    }
                }
            }
        }
        ctr = 0;
    }
}

function add_down(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let ctr = 0;

    for (let j = 0; j < cols; j++) {
        for (let i = rows - 1; i >= 0; i--) {
            if (arr[i][j] > 0) {
                if (i != 0 && arr[i][j] == arr[i - 1][j]) {
                    ctr = arr[i - 1][j];
                    arr[i][j] += ctr;
                    inc_score(arr[i][j]);
                    arr[i - 1][j] -= ctr;
                    ctr = 0;
                } else if (i != 0 && arr[i - 1][j] == 0) {
                    let itr = i - 1;
                    while (itr != 0 && arr[itr][j] == 0) itr -= 1;
                    if (arr[itr][j] == arr[i][j]) {
                        arr[i][j] += arr[itr][j];
                        inc_score(arr[i][j]);
                        arr[itr][j] = 0;
                        i = itr;
                    }
                }
            }
        }
        ctr = 0;
    }
}

function add_left(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let ctr = 0;

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            if (arr[j][i] > 0) {
                if (i != cols - 1 && arr[j][i] == arr[j][i + 1]) {
                    ctr = arr[j][i + 1];
                    arr[j][i] += ctr;
                    inc_score(arr[j][i]);
                    arr[j][i + 1] -= ctr;
                    ctr = 0;
                } else if (i != cols - 1 && arr[j][i + 1] == 0) {
                    let itr = i + 1;
                    while (i != cols - 1 && arr[j][itr] == 0) itr += 1;
                    if (arr[j][itr] == arr[j][i]) {
                        arr[j][i] += arr[j][itr];
                        inc_score(arr[j][i]);
                        arr[j][itr] = 0;
                        i = itr;
                    }
                }
            }
        }
        ctr = 0;
    }
}

function add_up(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let ctr = 0;

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (arr[i][j] > 0) {
                if (i != rows - 1 && arr[i][j] == arr[i + 1][j]) {
                    ctr = arr[i + 1][j];
                    arr[i][j] += ctr;
                    inc_score(arr[i][j]);
                    arr[i + 1][j] -= ctr;
                    ctr = 0;
                } else if (i != rows - 1 && arr[i + 1][j] == 0) {
                    let itr = i + 1;
                    while (itr != rows - 1 && arr[itr][j] == 0) itr += 1;
                    if (arr[itr][j] == arr[i][j]) {
                        arr[i][j] += arr[itr][j];
                        inc_score(arr[i][j]);
                        arr[itr][j] = 0;
                        i = itr - 1;
                    }
                }
            }
        }
        ctr = 0;
    }
}

function shift_right(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let zpt = cols;
    let zg = 0;

    for (let j = 0; j < rows; j++) {
        for (let i = cols - 1; i >= 0; i--) {
            if (arr[j][i] == 0 && zpt == cols) {
                zpt = i;
            } else if (arr[j][i] == 0 && arr[j][zpt] == 0) {
                zg += 1;
            } else if (i < zpt && zpt != cols && arr[j][i] != arr[j][zpt]) {
                [arr[j][i], arr[j][zpt]] = [arr[j][zpt], arr[j][i]];
                zpt = i + zg;
            } else {
                continue;
            }
        }
        zpt = cols;
        zg = 0;
    }
}

function shift_left(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let zpt = -1;
    let zg = 0;

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            if (arr[j][i] == 0 && zpt == -1) {
                zpt = i;
            } else if (arr[j][i] == 0 && arr[j][zpt] == 0) {
                zg += 1;
            } else if (i > zpt && zpt != -1 && arr[j][i] != arr[j][zpt]) {
                [arr[j][i], arr[j][zpt]] = [arr[j][zpt], arr[j][i]];
                zpt = i - zg;
            } else {
                continue;
            }
        }
        zpt = -1;
        zg = 0;
    }
}

function shift_up(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let zpt = -1;
    let zg = 0;

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (arr[i][j] == 0 && zpt == -1) {
                zpt = i;
            } else if (arr[i][j] == 0 && arr[zpt][j] == 0) {
                zg += 1;
            } else if (i > zpt && zpt != -1 && arr[i][j] != arr[zpt][j]) {
                [arr[i][j], arr[zpt][j]] = [arr[zpt][j], arr[i][j]];
                zpt = i - zg;
            } else {
                continue;
            }
        }
        zpt = -1;
        zg = 0;
    }
}

function shift_down(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let zpt = rows;
    let zg = 0;

    for (let j = 0; j < cols; j++) {
        for (let i = rows - 1; i >= 0; i--) {
            if (arr[i][j] == 0 && zpt == rows) {
                zpt = i;
            } else if (arr[i][j] == 0 && arr[zpt][j] == 0) {
                zg += 1;
            } else if (i < zpt && zpt != rows && arr[i][j] != arr[zpt][j]) {
                [arr[i][j], arr[zpt][j]] = [arr[zpt][j], arr[i][j]];
                zpt = i + zg;
            } else {
                continue;
            }
        }
        zpt = rows;
        zg = 0;
    }
}

// ---------- Wiring everything up -------------

function draw_gameboard(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let table = document.getElementById("game");
    let score_id = document.getElementById("score");
    let best_id = document.getElementById("best");
    let message_id = document.getElementById("message");
    let colors_map = {
        2: "#4169e1",
        4: "#0892d0",
        8: "#007FFF",
        16: "#01796f",
        32: "#1b4d3e",
        64: "#FF6700",
        128: "#b7410e"
    }

    let valid_moves = false;
    let choices = [2, 4];
    let blank_map = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arr[i][j] == 0)
                blank_map.push([i, j]);
        }
    }

    let blank_idx = Math.floor(Math.random() * blank_map.length);
    let chosen_idx = blank_map[blank_idx];
    arr[chosen_idx[0]][chosen_idx[1]] = choices[Math.floor(Math.random() * choices.length)];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arr[i][j] == 0) {
                valid_moves = true;
                table.rows[i].cells[j].style.backgroundColor = "#aaf0d1";
                table.rows[i].cells[j].innerHTML = "";
            }
            else {
                if (arr[i][j] == winning_score) {
                    has_won = true;
                    message_id.innerText = win_message;
                    $("#message").slideDown();
                }
                if (current_score > best_score) {
                    best_score = current_score;
                }
                score_id.innerText = current_score;
                best_id.innerText = best_score;
                // table.rows[i].cells[j].className = "fade-in";
                table.rows[i].cells[j].style.backgroundColor = colors_map[arr[i][j]];
                table.rows[i].cells[j].innerHTML = arr[i][j];
            }
        }
    }

    if (!valid_moves) {
        has_lost = true;
        message_id.innerText = lose_message;
        $("#message").slideDown();
    }
}

function main(event) {
    if (!has_won && !has_lost) {
        switch (event.keyCode) {
            case 37: add_left(arr); shift_left(arr); break;
            case 38: add_up(arr); shift_up(arr); break;
            case 39: add_right(arr); shift_right(arr); break;
            case 40: add_down(arr); shift_down(arr); break;
        }
        if (event.keyCode >= 37 && event.keyCode <= 40)
            draw_gameboard(arr);
    }
}

function generate_game(arr) {
    let choices = [0, 0, 0, 0, 0, 0, 0, 2, 4];
    current_score = 0;
    $("#message").slideUp();
    has_won = false;
    has_lost = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (j > choices.length / 4) // to further limit generation of seed numbers.
                arr[i][j] = choices[Math.floor(Math.random() * choices.length)];
            else
                arr[i][j] = 0;
        }
    }
    draw_gameboard(arr);
}


generate_game(arr);
document.addEventListener("keydown", main);