class GeneralSet {

    constructor() {
        this.map = new Map();
        this[Symbol.iterator] = this.values;
    }

    add(item) {
        this.map.set(item.toString(), item);
    }

    values() {
        return this.map.values();
    }

    delete(item) {
        return this.map.delete(item.toString());
    }

    // ...
}

export default GeneralSet;