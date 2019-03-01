import Router from './../lib/Router'

export default {
    init(app) {
        app.router = new Router(app.options.router)
        app.router.to('home')
    }
}
