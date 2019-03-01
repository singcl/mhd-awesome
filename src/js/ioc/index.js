import App from './App'
import Router from './Router'
import Track from './Track'

App.use([Router, Track])
new App({
    router: {
        mode: 'history'
    },
    track: {
        //
    },
    onReady(app) {
        //
    }
})
