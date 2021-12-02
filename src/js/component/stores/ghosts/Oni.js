import AbstractGhost from "./AbstractGhost"

export default class Oni extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'freezing_temp',
            'emf_5',
            'dots_projector'
        ]
    }
}