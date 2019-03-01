import Track from '../lib/Track'
export default {
    init(app) {
        app.track = new Track(app.options.track)
        app.track.tracking()
    }
}
