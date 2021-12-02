import AbstractGhost from "./AbstractGhost"

export default class Shade extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'ghost_writing',
            'emf_5',
            'freezing_temp'
        ]
    }
}