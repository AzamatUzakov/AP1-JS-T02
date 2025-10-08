


class Ship {
    constructor(name, length, position) {
        this._name = name
        this._length = length
        this._position = position
        this._hits = new Array(length).fill(false)
        this._startPosition = { x: 0, y: 0 }
    }


    get name() {
        return this._name
    }
    set name(value) {
        this._name = value
    }

    get length() {
        return this._length
    }
    set length(value) {
        this._length = value
    }


    get position() {
        return this._position
    }
    set position(value) {
        this._position = value
    }

    get hits() {
        return this._hits
    }
    set hits(value) {
        this._hits = value
    }


    get coordinatesX() {
        return this._startPosition.x
    }
    set coordinatesX(value) {
        this._startPosition.x = value
    }


    get coordinatesY() {
        return this._startPosition.y
    }
    set coordinatesY(value) {
        this._startPosition.y = value
    }

    hit(index) {//Функция отвечает за попадание в корабль
        if (index < this._length) {// Проверка чтобы index не привышал длинну карабля
            this._hits[index] = true
        } else {
            console.log("Мимо");

        }
    }

    isSunk() {//Функция для проверки утонул ли корабль
        if (!this._hits.includes(false)) {// Проверка утонул ли корабль
            return true

        } else {
            return false

        }
    }

}


//////////////////////////////////////////


class Board {
    constructor(size) {
        this._size = size
        this._grid = Array.from({ length: size }, () => new Array(size).fill(null));//Создаем двухмерный массив
        this._ships = []
    }



    get size() {
        return this._size
    }
    set size(value) {
        this._size = value
    }


    get grid() {
        return this._grid
    }
    set grid(value) {
        this._grid = value
    }


    get ships() {
        return this._ships
    }
    set ships(value) {
        this._ships = value
    }

    placeShip(ship, x, y) { //функция для размещение коробля
        if (ship.position === 0 && (x + ship.length - 1) < this.size) {//проверка, чтобы корабль полностью помещался по горизонтали.
            for (let i = 0; i < ship.length; i++) {
                if (this._grid[y][x + i] !== null) return console.log("Мест нету");
            }
            for (let i = 0; i < ship.length; i++) {
                this._grid[y][x + i] = ship
            }
            this._ships.push(ship);
            ship.coordinatesX = x

        } else if (ship.position === 1 && (y + ship.length - 1) < this.size) {
            for (let i = 0; i < ship.length; i++) {
                if (this._grid[y + i][x] !== null) return console.log("Мест нету");

            }
            for (let i = 0; i < ship.length; i++) {
                this._grid[y + i][x] = ship
            }
            this._ships.push(ship);
            ship.coordinatesY = y
        } else {
            console.log("Корабль не помещается");

        }
    }


    findAvailableCells() {// Функция для поиска свободных ячеек
        const availableCells = []

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this._grid[y][x] === null) {
                    availableCells.push({ x, y })
                }
            }
        }
        return availableCells
    }

    receiveAttack(x, y) {//функция для атаки кораблья
        const ship = this._grid[y][x];
        if (ship !== null) {
            if (ship.position === 0) {
                let index = x - ship.coordinatesX
                ship.hit(index)
            }
            if (ship.position === 1) {
                let index = y - ship.coordinatesY
                ship.hit(index)
            }
            return true
        } else {
            return false
        }
    }

    display() {//Функция для вывода текущего состояние доски
        for (let y = 0; y < this.size; y++) {
            let row = ""
            for (let x = 0; x < this.size; x++) {
                if (this._grid[y][x] === null) {
                    row += "O"
                } else if (this._grid[y][x] !== null) {
                    if (this._grid[y][x].position === 1) {//для вертикали
                        let index = y - this._grid[y][x].coordinatesY
                        if (this._grid[y][x].hits[index] === true) {
                            row += "X"
                        } else {
                            row += "S"
                        }
                    } else if (this._grid[y][x].position === 0) {//для горизонтали
                        let index = x - this._grid[y][x].coordinatesX
                        if (this._grid[y][x].hits[index] === true) {
                            row += "X"
                        } else {
                            row += "S"
                        }
                    }
                }

            }
            console.log(`Row ${y}:`, row);

        }
    }

}


let shipName = prompt("Введите имя корабля:")
let shipTest = new Ship(shipName, 3, 1)
let board = new Board(5);
board.placeShip(shipTest, 0, 0)
console.log(board.size, board.receiveAttack(0, 1));
