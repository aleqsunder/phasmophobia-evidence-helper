import AbstractGhost from "./AbstractGhost"

export default class Myling extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'emf_5',
            'fingerprints',
            'ghost_writing'
        ]
    }
}