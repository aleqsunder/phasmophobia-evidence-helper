import AbstractGhost from "./AbstractGhost"

export default class Onryo extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'ghost_orb',
            'freezing_temp',
            'spirit_box'
        ]
    }
}