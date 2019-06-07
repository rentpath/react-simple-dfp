module.exports = `
  function EventBus() {
    var subscriptions = {};
    var calledMessages = {};
    var subcount = 1;

    this.subscribe = function subscribeCallbackToEvent(eventType, callback) {
      var id = subcount++;
      if (!subscriptions[eventType]) subscriptions[eventType] = {};
      subscriptions[eventType][id] = callback;
      if (calledMessages[eventType]) {
        callback();
      }
      return {
        unsubscribe: function unsubscribe() {
          delete subscriptions[eventType][id];
          if (subscriptions[eventType].length === 0) {
            delete subscriptions[eventType];
          }
        },
      };
    };

    this.publish = function publishEventWithArgs(eventType, arg) {
      calledMessages[eventType] = true;

      if (!subscriptions[eventType]) return;

      Object.keys(subscriptions[eventType])
        .forEach(function(key) { subscriptions[eventType][key](arg) });
    };
  }

  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.eventBus = new EventBus()

  window.googletag.cmd.push(function() {
    if (window.googletag && googletag.apiReady) {
      return eventBus.publish('google_tag_ready')
    }
  })
`
