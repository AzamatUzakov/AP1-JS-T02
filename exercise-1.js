


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

    hit(index) {
        if (index < this._length) {// Проверка чтобы index не привышал длинну карабля
            this._hits[index] = true
        } else {
            console.log("Мимо");

        }
    }

    isSunk() {
        if (!this._hits.includes(false)) {// Проверка утонул ли корабль
            return true

        } else {
            return false

        }
    }

}

let shipName = prompt("Введите имя корабля:")
let length = +prompt("Введите длину корабля:")
let position = +prompt("Введите расположение (0 - горизонтальное,  1 - вертикальное):")
let shipTest = new Ship(shipName, length, position)

shipTest.hit(0)
shipTest.hit(1)
console.log(shipTest.name, shipTest.length, shipTest.position, shipTest.isSunk());
