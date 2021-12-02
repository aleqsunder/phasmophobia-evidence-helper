import AbstractGhost from "./AbstractGhost"

export default class Mare extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'ghost_orb',
            'spirit_box',
            'ghost_writing'
        ]
    }
}