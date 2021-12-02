import AbstractGhost from "./AbstractGhost"

export default class Poltergeist extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'spirit_box',
            'fingerprints',
            'ghost_writing'
        ]
    }
}