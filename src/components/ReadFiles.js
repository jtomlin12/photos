const cache = {}

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)))
}
// Note from the docs -> Warning: The arguments passed to require.context must be literals!
importAll(require.context('../../public/images', false, /\.(JPG|jpe?g|svg)$/))

const images = Object.entries(cache).map((module) => module[1].default)

export default images
