<template>
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
            <li class="item__content-li" v-for="item in filteredGhosts">
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
    export default {
        name: "app",

        data () {
            return {
                SELECTED: {
                    EVIDENCES: [],
                },

                EVIDENCE: {
                    ORB: 'Призрачный огонёк',
                    RADIO: 'Радиоприёмник',
                    FINGER: 'Отпечатки',
                    EMP: 'Датчик EMП',
                    TEMP: 'Минусовая температура',
                    BOOK: 'Записи в блокноте',
                    LASER: 'Лазерный протектор',
                },

                GHOSTS: {
                    'Дух': ['EMP', 'RADIO', 'BOOK'],
                    'Мираж': ['EMP', 'LASER', 'RADIO'],
                    'Фантом': ['RADIO', 'FINGER', 'LASER'],
                    'Полтергейст': ['RADIO', 'FINGER', 'BOOK'],
                    'Банши': ['LASER', 'FINGER', 'ORB'],
                    'Джинн': ['TEMP', 'FINGER', 'EMP'],
                    'Мара': ['ORB', 'RADIO', 'BOOK'],
                    'Ревенант': ['ORB', 'TEMP', 'BOOK'],
                    'Тень': ['BOOK', 'EMP', 'TEMP'],
                    'Демон': ['FINGER', 'BOOK', 'TEMP'],
                    'Юрэй': ['ORB', 'LASER', 'TEMP'],
                    'Они': ['TEMP', 'EMP', 'LASER'],
                    'Ханту': ['FINGER', 'ORB', 'TEMP'],
                    'Ёкай': ['RADIO', 'ORB', 'LASER'],
                    'Горё': ['EMP', 'FINGER', 'LASER'],
                    'Мюлинг': ['EMP', 'FINGER', 'BOOK'],
                }
            }
        },

        methods: {
            select (key) {
                if (this.SELECTED.EVIDENCES.length < 3 && !this.SELECTED.EVIDENCES.includes(key)) {
                    this.SELECTED.EVIDENCES = [...this.SELECTED.EVIDENCES, key]
                }
            },

            unselect (key) {
                this.SELECTED.EVIDENCES = this.SELECTED.EVIDENCES.filter(e => e !== key)
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