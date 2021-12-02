import AbstractGhost from "./AbstractGhost"

export default class Raiju extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'dots_projector',
            'emf_5',
            'ghost_orb'
        ]
    }
}