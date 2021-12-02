export default class AbstractGhost {
    constructor () {
        this._items = []
    }

    get items () {
        return this._items
    }
}