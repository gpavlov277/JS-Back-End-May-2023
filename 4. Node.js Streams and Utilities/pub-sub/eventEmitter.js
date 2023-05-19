const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
eventEmitter.on("user-add", () => {
  console.log("New User is added", "Nasko");
});
eventEmitter.on("user-add", (username, age) => {
  console.log("New user is added 2: " + username + " " + age);
});
eventEmitter.on("user-remove", () => {
  console.log("User is removed");
});
eventEmitter.emit("user-add", "Pesho", "15-Emit");
eventEmitter.emit("user-remove");
