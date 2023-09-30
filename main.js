let conway = document.getElementById("conway").getContext("2d");

document.getElementById("conway").width = window.innerWidth;
document.getElementById("conway").height = window.innerHeight;
const width = document.getElementById("conway").width;
const height = document.getElementById("conway").height;
let size = 5;

let grid = [];
let tempgrid = [];

function draw(x, y, c, s) {
    conway.fillStyle = c;
    conway.fillRect(x, y, s, s);
}

function cellValue(x, y) {
    try {
        return grid[x][y];
    } catch {
        return 0;
    }
}

function countNeighbours(x, y) {
    let count = 0;

    count += cellValue(x - 1, y) || 0;
    count += cellValue(x + 1, y) || 0;
    count += cellValue(x, y - 1) || 0;
    count += cellValue(x, y + 1) || 0;
    count += cellValue(x - 1, y - 1) || 0;
    count += cellValue(x + 1, y - 1) || 0;
    count += cellValue(x - 1, y + 1) || 0;
    count += cellValue(x + 1, y + 1) || 0;

    return count;
}

function updateCell(x, y) {
    let neighbours = countNeighbours(x, y);
    if (neighbours > 4 || neighbours < 3) {
        return 0;
    }
    if (grid[x][y] === 0 && neighbours === 3) {
        return 1;
    }
    return grid[x][y];
}

function initArray(w, h) {
    let array = [];
    for (let x = 0; x < w; x++) {
        array[x] = [];
        for (let y = 0; y < h; y++) {
            array[x][y] = 0;
        }
    }
    return array;
}

function init() {
    grid = initArray(width / size, height / size);
    tempgrid = initArray(width / size, height / size);

    for (let x = 0; x < width / size; x++) {
        for (let y = 0; y < height / size; y++) {
            if (Math.random() > 0.5) {
                grid[x][y] = 1;
            }
        }
    }
    update();
}

function update() {
    conway.clearRect(0, 0, width, height);
    draw(0, 0, "black", width);

    for (let x = 0; x < width / size; x++) {
        for (let y = 0; y < height / size; y++) {
            tempgrid[x][y] = updateCell(x, y);
        }
    }
    grid = [...tempgrid.map(row => [...row])];

    var cnt = 0;

    for (let x = 0; x < width / size; x++) {
        for (let y = 0; y < height / size; y++) {
            if (grid[x][y]) {
                draw(x * size, y * size, `rgb(${x}, ${y}, 100)`, size);
                cnt += 1;
            }
        }
    }

    if (((width / size) * (height / size)) / cnt > 96) {
        init();
    }
    setTimeout(() => {
        requestAnimationFrame(update);
    }, 90);
}

init();
