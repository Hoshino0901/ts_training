"use strict";
function copy(value) {
    return value;
}
console.log(copy("hello").toUpperCase);
function copy2(value) {
    return value;
}
console.log(copy({ name: "Takumi" }));
function copy3(value, key) {
    return value[key];
}
console.log(copy3({ name: 'Takumi', age: 26 }, 'age'));
class LightDataBase {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    remove(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}
const stringLightDatabase = new LightDataBase();
stringLightDatabase.add('banana');
stringLightDatabase.add('apple');
stringLightDatabase.add('grape');
stringLightDatabase.remove('apple');
console.log(stringLightDatabase.get());
const fetchData = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
});
fetchData.then(data => {
    console.log(data.toUpperCase());
});
