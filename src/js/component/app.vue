<template>
    <div class="notifications">
        <notification v-for="notification in notifications" :key="notification.key" :notification="notification" @delete="removeNotification"/>
    </div>
    <div class="item">
        <h3 class="item__title">Выбранные улики</h3>
        <transition-group v-if="SELECTED.EVIDENCES.length > 0" name="item__content" tag="ul" class="item__content">
            <li class="item__content-li" v-for="(key, index) in SELECTED.EVIDENCES" :key="index" v-text="EVIDENCE[key]" @click="unselect(key)"/>
        </transition-group>
        <h5 v-else class="item__content item_title">Не выбрано ни одной улики</h5>
    </div>
    <div class="item">
        <h3 class="item__title">Все улики</h3>
        <transition-group name="item__content" tag="ul" class="item__content">
            <li class="item__content-li" v-for="key in filteredEvidences" :key="key" v-text="EVIDENCE[key]" @click="select(key)"/>
        </transition-group>
    </div>
    <div class="item">
        <h3 class="item__title">Призраки</h3>
        <ul class="item__content" data-ghosts>
            <li class="item__content-li" v-for="item in filteredGhosts" @click="showGhostEvidences(GHOSTS[item])">
                <p class="item__content-li__header">{{ item }}</p>
                <ul v-if="SELECTED.EVIDENCES.length === 2" class="item__content-li__massive">
                    <template v-for="evidence in GHOSTS[item]">
                        <li v-if="!SELECTED.EVIDENCES.includes(evidence)" class="item__content-li__massive-item">
                            {{ EVIDENCE[evidence] }}
                        </li>
                    </template>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import { ghosts, evidences } from '../constants/lang/ru/list'
    import notification from "./notification";

    export default {
        name: "app",
        components: {notification},

        data () {
            return {
                notifications: [],

                SELECTED: {
                    EVIDENCES: [],
                },

                EVIDENCE: {
                    ORB:    evidences.ORB,
                    RADIO:  evidences.RADIO,
                    FINGER: evidences.FINGER,
                    EMP:    evidences.EMP,
                    TEMP:   evidences.TEMP,
                    BOOK:   evidences.BOOK,
                    LASER:  evidences.LASER,
                },

                GHOSTS: {
                    [ghosts.SPIRIT]:      ['EMP', 'RADIO', 'BOOK'],
                    [ghosts.WRAITH]:      ['EMP', 'LASER', 'RADIO'],
                    [ghosts.PHANTOM]:     ['RADIO', 'FINGER', 'LASER'],
                    [ghosts.POLTERGEIST]: ['RADIO', 'FINGER', 'BOOK'],
                    [ghosts.BANSHEE]:     ['LASER', 'FINGER', 'ORB'],
                    [ghosts.JINN]:        ['TEMP', 'FINGER', 'EMP'],
                    [ghosts.MARE]:        ['ORB', 'RADIO', 'BOOK'],
                    [ghosts.REVENANT]:    ['ORB', 'TEMP', 'BOOK'],
                    [ghosts.SHADE]:       ['BOOK', 'EMP', 'TEMP'],
                    [ghosts.DEMON]:       ['FINGER', 'BOOK', 'TEMP'],
                    [ghosts.YUREI]:       ['ORB', 'LASER', 'TEMP'],
                    [ghosts.ONI]:         ['TEMP', 'EMP', 'LASER'],
                    [ghosts.HANTU]:       ['FINGER', 'ORB', 'TEMP'],
                    [ghosts.YOKAI]:       ['RADIO', 'ORB', 'LASER'],
                    [ghosts.GORYO]:       ['EMP', 'FINGER', 'LASER'],
                    [ghosts.MYLING]:      ['EMP', 'FINGER', 'BOOK'],
                }
            }
        },

        methods: {
            select (key) {
                if (this.SELECTED.EVIDENCES.length < 3 && !this.SELECTED.EVIDENCES.includes(key)) {
                    this.SELECTED.EVIDENCES = [...this.SELECTED.EVIDENCES, key]
                }

                if (this.filteredGhosts.length === 0) {
                    this.unselect(key)
                    this.addNotification(`"${this.EVIDENCE[key]}": добавление данного пункта приведёт к пустому списку призраков`)
                }
            },

            unselect (key) {
                this.SELECTED.EVIDENCES = this.SELECTED.EVIDENCES.filter(e => e !== key)
            },

            showGhostEvidences (evidences) {
                this.SELECTED.EVIDENCES = evidences
            },

            addNotification (message) {
                this.notifications = [...this.notifications, {key: Date.now() / 1000 ^ 0, message}]
            },

            removeNotification (key) {
                this.notifications = this.notifications.filter(notification => {
                    return notification.key !== key
                })
            }
        },

        computed: {
            filteredGhosts () {
                return Object.keys(this.GHOSTS).filter(ghost => {
                    return this.SELECTED.EVIDENCES.every(evidence => this.GHOSTS[ghost].includes(evidence))
                })
            },

            filteredEvidences () {
                return Object.keys(this.EVIDENCE).filter(evidence => !this.SELECTED.EVIDENCES.includes(evidence))
            }
        }
    }
</script>