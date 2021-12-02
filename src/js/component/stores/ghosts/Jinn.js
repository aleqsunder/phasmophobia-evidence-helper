import AbstractGhost from "./AbstractGhost"

export default class Jinn extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'freezing_temp',
            'fingerprints',
            'emf_5'
        ]
    }
}