import AbstractGhost from "./AbstractGhost"

export default class Hantu extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'fingerprints',
            'ghost_orb',
            'freezing_temp'
        ]
    }
}