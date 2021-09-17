<template>
    <template v-if="l18n.messages">
        <div class="notifications">
            <notification v-for="notification in notifications" :key="notification.key" :notification="notification" @delete="removeNotification"/>
        </div>
        <div class="languages">
            <language v-for="name in listOfLanguages" :key="name" :language="languages[name]" :selected-language="selectedLanguage" @setLanguage="setLanguage"/>
        </div>
        <div class="item">
            <h3 class="item__title" v-text="l18n.messages.selectedEvidence"/>
            <transition-group v-if="selected.evidences.length > 0" name="item__content" tag="ul" class="item__content">
                <li class="item__content-li" v-for="(key, index) in selected.evidences" :key="index" v-text="evidences[key]" @click="unselect(key)"/>
            </transition-group>
            <h5 v-else class="item__content item_title" v-text="l18n.messages.noEvidenceSelected"/>
        </div>
        <div class="item">
            <h3 class="item__title" v-text="l18n.messages.allEvidence"/>
            <transition-group name="item__content" tag="ul" class="item__content">
                <li class="item__content-li" v-for="key in filteredEvidences" :key="key" v-text="evidences[key]" @click="select(key)"/>
            </transition-group>
        </div>
        <div class="item">
            <h3 class="item__title" v-text="l18n.messages.ghosts"/>
            <ul class="item__content" data-ghosts>
                <li class="item__content-li" v-for="item in filteredGhosts" @click="showGhostEvidences(item)">
                    {{ item }}
                    <ul v-if="selected.evidences.length === 2" class="item__content-li__massive">
                        <template v-for="evidence in ghosts[item]">
                            <li v-if="!selected.evidences.includes(evidence)" class="item__content-li__massive-item" v-text="evidences[evidence]"/>
                        </template>
                    </ul>
                </li>
            </ul>
        </div>
    </template>
</template>

<script>
    import config from "../config"
    import * as languages from "../constants/lang/all"
    import notification from "./notification"
    import language from "./language"

    export default {
        name: "app",
        components: {notification, language},

        data () {
            return {
                languages,

                selectedLanguage: null,
                l18n:             {},

                notifications:    [],
                selected: {
                    evidences:    [],
                }
            }
        },

        methods: {
            select (key) {
                if (this.selected.evidences.length < 3 && !this.selected.evidences.includes(key)) {
                    this.selected.evidences = [...this.selected.evidences, key]
                }

                this.triggerLocalSave()

                if (this.filteredGhosts.length === 0) {
                    this.unselect(key)
                    this.addNotification(this.l18n.messages.emptyGhostList(this.evidences[key]))
                }
            },

            unselect (key) {
                this.selected.evidences = this.selected.evidences.filter(e => e !== key)
                this.triggerLocalSave()
            },

            showGhostEvidences (evidences) {
                this.selected.evidences = this.ghosts[evidences]
            },

            addNotification (message) {
                this.notifications = [...this.notifications, {key: Date.now() / 1000 ^ 0, message}]
            },

            removeNotification (key) {
                this.notifications = this.notifications.filter(notification => {
                    return notification.key !== key
                })
            },

            setLanguage (lang) {
                if (!Object.keys(this.languages).includes(lang)) {
                    this.addNotification(this.l18n.messages.languageNotSupported)
                    return false
                }

                this.selectedLanguage = lang
                this.l18n = this.languages[lang]

                localStorage.setItem('peh--language', lang)
            },

            triggerLocalSave () {
                localStorage.setItem('peh--selected', JSON.stringify(this.selected.evidences))
            }
        },

        computed: {
            /**
             * Список призраков, подходящих под условие выбранных улик
             * @return Array
             */
            filteredGhosts () {
                return Object.keys(this.ghosts).filter(ghost => {
                    return this.selected.evidences.every(evidence => this.ghosts[ghost].includes(evidence))
                })
            },

            /**
             * Невыбранные условия
             * @return Array
             */
            filteredEvidences () {
                return Object.keys(this.evidences).filter(evidence => !this.selected.evidences.includes(evidence))
            },

            /**
             * Улики
             * @return Object
             */
            evidences () {
                if (!this.l18n.hasOwnProperty('evidences')) {
                    return {}
                }

                return {
                    orb:    this.l18n.evidences.orb,
                    radio:  this.l18n.evidences.radio,
                    finger: this.l18n.evidences.finger,
                    emp:    this.l18n.evidences.emp,
                    temp:   this.l18n.evidences.temp,
                    book:   this.l18n.evidences.book,
                    laser:  this.l18n.evidences.laser,
                }
            },

            /**
             * Призраки
             * @return Object
             */
            ghosts () {
                if (!this.l18n.hasOwnProperty('ghosts')) {
                    return {}
                }

                return {
                    [this.l18n.ghosts.spirit]:      ['emp', 'radio', 'book'],
                    [this.l18n.ghosts.wraith]:      ['emp', 'laser', 'radio'],
                    [this.l18n.ghosts.phantom]:     ['radio', 'finger', 'laser'],
                    [this.l18n.ghosts.poltergeist]: ['radio', 'finger', 'book'],
                    [this.l18n.ghosts.banshee]:     ['laser', 'finger', 'orb'],
                    [this.l18n.ghosts.jinn]:        ['temp', 'finger', 'emp'],
                    [this.l18n.ghosts.mare]:        ['orb', 'radio', 'book'],
                    [this.l18n.ghosts.revenant]:    ['orb', 'temp', 'book'],
                    [this.l18n.ghosts.shade]:       ['book', 'emp', 'temp'],
                    [this.l18n.ghosts.demon]:       ['finger', 'book', 'temp'],
                    [this.l18n.ghosts.yurei]:       ['orb', 'laser', 'temp'],
                    [this.l18n.ghosts.oni]:         ['temp', 'emp', 'laser'],
                    [this.l18n.ghosts.hantu]:       ['finger', 'orb', 'temp'],
                    [this.l18n.ghosts.yokai]:       ['radio', 'orb', 'laser'],
                    [this.l18n.ghosts.goryo]:       ['emp', 'finger', 'laser'],
                    [this.l18n.ghosts.myling]:      ['emp', 'finger', 'book'],
                }
            },

            /**
             * Список языков
             * @return Array
             */
            listOfLanguages () {
                return Object.keys(this.languages)
            }
        },

        mounted () {
            this.setLanguage(localStorage.getItem('peh--language') ?? config.PROJECT_LANGUAGE)
            this.selected.evidences = JSON.parse(localStorage.getItem('peh--selected') ?? [])
        }
    }
</script>