import AbstractGhost from "./AbstractGhost"

export default class Demon extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'fingerprints',
            'ghost_writing',
            'freezing_temp'
        ]
    }
}