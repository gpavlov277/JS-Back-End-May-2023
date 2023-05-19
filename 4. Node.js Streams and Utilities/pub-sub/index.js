const eventBus = require("./eventBus");
eventBus.subsrcibe("user-add", () => {
  console.log("New User is added", "Nasko");
});
const unsubscribe = eventBus.subsrcibe("user-add", (username, age) => {
  console.log("New user is added 2: " + username + " " + age);
});
eventBus.subsrcibe("user-remove", () => {
  console.log("User is removed");
});
eventBus.publish("user-add", "Pesho", "15");
eventBus.publish("user-remove");

unsubscribe();
eventBus.publish("user-add", "Pesho", "15");
