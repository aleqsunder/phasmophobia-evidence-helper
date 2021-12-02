import AbstractGhost from "./AbstractGhost"

export default class Yurei extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'ghost_orb',
            'dots_projector',
            'freezing_temp'
        ]
    }
}