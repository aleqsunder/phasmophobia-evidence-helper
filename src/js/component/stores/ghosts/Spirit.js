import AbstractGhost from "./AbstractGhost"

export default class Spirit extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'ghost_writing',
            'emf_5',
            'spirit_box',
        ]
    }
}