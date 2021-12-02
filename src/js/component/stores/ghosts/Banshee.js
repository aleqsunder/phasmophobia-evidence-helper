import AbstractGhost from "./AbstractGhost"

export default class Banshee extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'dots_projector',
            'fingerprints',
            'ghost_orb'
        ]
    }
}