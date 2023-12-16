const StringClass = require("./src/StringClass/StringClass.js")

let name = new StringClass("Mateus");

console.log(name.toUpper());
console.log(name.toLower());
console.log(name.makeSplitAndSort());
console.log(name.showLength());