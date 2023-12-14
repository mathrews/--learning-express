class StringClass {
  constructor(name) {
    this.name = name;
  }

  toUpper() {
    return this.name.toUpperCase();
  }

  toLower() {
    return this.name.toLowerCase();
  }

  makeSplit() {
    return this.name.split("")
  }

  showLength() {
    return this.name.length
  }
}

module.exports = StringClass;