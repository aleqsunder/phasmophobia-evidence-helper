import AbstractGhost from "./AbstractGhost"

export default class Revenant extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'ghost_orb',
            'freezing_temp',
            'ghost_writing'
        ]
    }
}