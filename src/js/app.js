import { createApp } from 'vue'
import { createStore } from 'vuex'

import app from "./component/app"
import languages from "./component/stores/languages"
import notifications from "./component/stores/notifications"
import evidences from "./component/stores/evidences"
import ghosts from "./component/stores/ghosts"

const store = createStore({
    modules: {
        languages,
        notifications,
        evidences,
        ghosts
    }
})

const App = createApp(app)

App.use(store)
App.mount('#root')