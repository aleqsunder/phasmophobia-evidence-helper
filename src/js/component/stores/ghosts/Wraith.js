import AbstractGhost from "./AbstractGhost"

export default class Wraith extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'dots_projector',
            'emf_5',
            'spirit_box',
        ]
    }
}