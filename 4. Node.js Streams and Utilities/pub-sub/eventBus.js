const eventEmitter = require("events");

const listeners = {};

const publish = (eventName, ...data) => {
  listeners[eventName]?.forEach((listener) => {
    listener(...data);
  });
};
const subsrcibe = (eventName, eventListener) => {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }
  listeners[eventName].push(eventListener);

  return () => {
    console.log("Unsubscribed");
    listeners[eventName] = listeners[eventName].filter(
      (x) => x != eventListener
    );
  };
};

const eventBus = {
  publish,
  subsrcibe,
};

module.exports = eventBus;
