import AbstractGhost from "./AbstractGhost"

export default class Phantom extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'spirit_box',
            'fingerprints',
            'dots_projector'
        ]
    }
}