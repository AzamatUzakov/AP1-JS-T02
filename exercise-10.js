



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
            ship.coordinatesY = y;
        } else if (ship.position === 1 && (y + ship.length - 1) < this.size) {
            for (let i = 0; i < ship.length; i++) {
                if (this._grid[y + i][x] !== null) return console.log("Мест нету");

            }
            for (let i = 0; i < ship.length; i++) {
                this._grid[y + i][x] = ship
            }
            this._ships.push(ship);
            ship.coordinatesX = x
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
        console.log(`Атака по координатам: x=${x}, y=${y}`);
        console.log(this._grid);
        const ship = this._grid[y] ? this._grid[y][x] : undefined;// 👈 поменяли местами
        if (!ship) return false;
        if (ship.position === 0) {
            let index = x - ship.coordinatesX
            ship.hit(index)
        }
        if (ship.position === 1) {
            let index = y - ship.coordinatesY
            ship.hit(index)
        }
        return true

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
let board = new Board(5);


class Player {
    constructor(name, boardSize) {
        this._name = name
        this._boardSize = boardSize
        this._board = new Board(boardSize)
    }

    get name() {
        return this._name
    }
    set name(value) {
        this._name = value
    }


    get boardSize() {
        return this._boardSize
    }
    set boardSize(value) {
        this._boardSize = value
        this._board = new Board(value)
    }
    get board() {
        return this._board
    }

    placeShips(ship) {// вызов функции у экземпляра Board, для размещение корабля
        this._board.placeShip(ship, ship.coordinatesX, ship.coordinatesY)
    }

    async takeTurn(opponent) {//Функция принимает аргумент ввиде экземпляр игрока и возврощает кардинаты и сам объект
        let x = +prompt("Кординаты по X  для атаки")
        let y = +prompt("Кординаты по Y  для атаки")

        return { x: x, y: y, opponent: opponent }
    }




}

let player = new Player("Azamat", 5)

class App {
    constructor(boardSize, maxLengthShip, maxNumShip) {
        this._boardSize = boardSize
        this._board = new Board(boardSize)
        this._maxLengthShip = maxLengthShip
        this._maxNumShip = maxNumShip
    }

    get boardSize() {
        return this._boardSize
    }
    set boardSize(value) {
        this._boardSize = value
        this._board = new Board(value)
    }

    get maxLengthShip() {
        return this._maxLengthShip
    }
    set maxLengthShip(value) {
        this._maxLengthShip = value
    }

    get maxNumShip() {
        return this._maxNumShip
    }
    set maxNumShip(value) {
        this._maxNumShip = value
    }

    firstPlayer = false;
    secondPlayer = false;

    shipArrangement(player, shipCount, maxShipLength) {// функция  для расстановки кораблей игрока на поле перед началом игры.
        for (let i = 0; i < shipCount; i++) {
            let shipName = prompt("Введите имя корабля:")
            let length = +prompt("Введите длину корабля:")
            let position = +prompt("Введите расположение (0 - горизонтальное,  1 - вертикальное):")
            while (length > maxShipLength) {
                length = +prompt("Введите длину корабля:")
            }

            let ship = new Ship(shipName, length, position)
            let x = +prompt("Кординаты по X для расстановки")
            let y = +prompt("Кординаты по Y для расстановки")

            ship.coordinatesX = x
            ship.coordinatesY = y
            player.placeShips(ship)

        }
    }

    async takeTimeTurn(currentPlayer, opponent) {
        console.log(`Ходит ${currentPlayer.name}`);

        opponent.board.display();

        let { x, y } = await currentPlayer.takeTurn(opponent);
        console.log(`→ ${currentPlayer.name} стреляет по координатам: x=${x}, y=${y}`);

        const hit = opponent.board.receiveAttack(x, y);

        if (hit) {
            console.log(`${currentPlayer.name} попал!`);
            const ship = opponent.board.grid[y][x];
            if (ship.isSunk()) {
                console.log(`Корабль ${ship.name} потоплен!`);
            }
        } else {
            console.log(`${currentPlayer.name} промахнулся.`);
        }

        if (opponent.board.ships.every(ship => ship.isSunk())) {
            console.log(`\n=== Итоги игры ===`);
            console.log(`🏆 Победил ${currentPlayer.name}!`);
            console.log(`=====================\n`);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.takeTimeTurn(opponent, currentPlayer);
    }


    run() {//функция проццес создание игроков и заполнение короблями их досок, в целом упровление игрой
        //  let playerType = +prompt("Выбирите опонента 1 — человек, 0 — компьютер")

        let player1 = prompt("Имя Робота №1")
        let player2 = prompt("Имя Робота №2")

        let player1Obj = new AIPlayer(player1, 5)
        let opponent = null
        let aiPlayer = new AIPlayer(player2, 5)
        this.shipArrangement(aiPlayer, this._maxNumShip, this._maxLengthShip)
        opponent = aiPlayer

        this.shipArrangement(player1Obj, this._maxNumShip, this._maxLengthShip)


        this.takeTimeTurn(player1Obj, opponent);


    }
}


class HumanPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize)
    }
    //Переопределяю функцию из Player
    placeShips(ship) {// вызов функции у экземпляра Board, для размещение корабля
        this._board.placeShip(ship, ship.coordinatesX, ship.coordinatesY)
    }

    //Переопределяю функцию из Player
    async takeTurn(opponent) {//Функция принимает аргумент ввиде экземпляр игрока и возврощает кардинаты и сам объект
        let x = +prompt("Кординаты по X  для атаки")
        let y = +prompt("Кординаты по Y  для атаки")

        return { x: x, y: y, opponent: opponent }
    }
}




class AIPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize)
    }
    //Переопределяю функцию из Player
    placeShips(ship) {// вызов функции у экземпляра Board, для размещение корабля
        this._board.placeShip(ship, ship.coordinatesX, ship.coordinatesY)
    }

    //Переопределяю функцию из Player
    async takeTurn(opponent) {//Функция принимает аргумент ввиде экземпляр игрока и возврощает кардинаты и сам объект
        let x = Math.floor(Math.random() * this._board.size)
        let y = Math.floor(Math.random() * this._board.size)

        return { x: x, y: y, opponent: opponent }
    }
}
/* let aiPlaer = new AIPlayer("AIPlayer", 5)
 */

let app = new App(5, 3, 1)
app.run()

