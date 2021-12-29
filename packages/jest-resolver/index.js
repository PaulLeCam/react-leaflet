module.exports = (request, options) => {
  const { defaultResolver } = options
  try {
    return defaultResolver(request, options)
  } catch (e) {
    try {
      return defaultResolver(request.replace(/\.js$/, '.ts'), options)
    } catch (e) {
      return defaultResolver(request.replace(/\.js$/, '.tsx'), options)
    }
  }
}
