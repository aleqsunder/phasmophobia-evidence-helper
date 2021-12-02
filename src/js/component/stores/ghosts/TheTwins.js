import AbstractGhost from "./AbstractGhost"

export default class TheTwins extends AbstractGhost {
    constructor () {
        super()
        this._items = [
            'emf_5',
            'freezing_temp',
            'spirit_box'
        ]
    }
}