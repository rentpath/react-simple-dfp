module.exports = `
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(function() {
    if (window.googletag && googletag.apiReady) {
      return eventBus.publish("google_tag_ready")
    }
  })
`
