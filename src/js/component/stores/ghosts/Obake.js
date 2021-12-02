import AbstractGhost from "./AbstractGhost"

export default class Obake extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'emf_5',
            'ghost_orb',
            'fingerprints'
        ]
    }
}