const cats = [];

exports.getCats = () => cats.slice();
exports.addCat = (name, age) => {
  cats.push({ name, age });
};
