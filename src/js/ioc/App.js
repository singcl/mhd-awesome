// Ioc 控制反转
class App {
    constructor(options) {
        this.options = options
        this.init()
    }

    static modules = []
    static use(mod) {
        Array.isArray(mod)
            ? mod.map(item => App.modules.push(item))
            : App.modules.push(mod)
    }

    init() {
        window.addEventListener("DOMContentLoaded", () => {
            this.initModules()
            this.options.onReady(this)
        })
    }

    initModules() {
        App.modules.map(
            mod => mod.init && typeof mod.init === "function" && mod.init(this)
        )
    }
}
