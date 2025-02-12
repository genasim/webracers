export class Player {
    size = 50;
    position;
    #id;

    constructor(id, { x, y }) {
        this.#id = id;
        this.position = { x, y };
    }

    updatePosition({ x, y }) {
        this.position = { x, y };
    }

    get id() {
        return this.#id;
    }
}