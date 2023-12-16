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

  makeSplitAndSort() {
    return this.name.split("").sort();
  }

  showLength() {
    return this.name.length
  }
}

module.exports = StringClass;