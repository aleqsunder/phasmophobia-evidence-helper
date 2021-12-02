import AbstractGhost from "./AbstractGhost"

export default class Yokai extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'spirit_box',
            'ghost_orb',
            'dots_projector'
        ]
    }
}