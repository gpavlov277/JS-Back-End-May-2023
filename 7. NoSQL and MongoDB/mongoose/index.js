const mongoose = require("mongoose");
// const Cat = require("./models/Cat");
const Car = require("./models/Car");
async function connectDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/cars");

  console.log("Connection Successful");

  //   const newCat = new Cat({
  //     name: "Zuza",
  //     age: 10,
  //     breed: "Persian",
  //   });
  //   console.log(newCat);
  //   await newCat.save();

  //   const newCat = await Cat.create({
  //     name: "Navcho",
  //     age: 8,
  //     breed: "Persian",
  //   });

  // Update 1
  //   const zuza = await Cat.findOne({ name: "Zuza" });
  //   zuza.age = 2;
  //   await zuza.save();

  //Update 2
  //   await Cat.updateOne({ name: "Navcho" }, { $set: { age: 12 } });

  // Delete
  //   await Cat.deleteOne({ name: "Zuza" });

  // Delete 2
  //   await Cat.findByIdAndDelete("64781573abe4836c35f318d9");

  //   const cats = await Cat.find();
  //   console.log(cats);

  //   cats.forEach((cat) => cat.greet());
  //   cats.forEach((cat) => cat.info);

//   const newCar = new Car({
//     make: "Mazda",
//     model: "Mazda6",
//     horsepower: 175,
//   });
//   await newCar.save();
}

connectDb();
