const StringClass = require("./src/StringClass/StringClass.js")

let name = new StringClass("Mateus");

console.log(name.toUpper());
console.log(name.toLower());
console.log(name.makeSplit());
console.log(name.showLength());