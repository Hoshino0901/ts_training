"use strict";
class Person {
    constructor(iniName, iniAge) {
        this.name = iniName;
        this.age = iniAge;
    }
    incrementAge() {
        this.age += 1;
    }
    greeting() {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
        this.explainJob();
    }
}
class Teacher extends Person {
    get subject() {
        if (!this._subject) {
            console.log("There is no subject.");
            return "";
        }
        return this._subject;
    }
    set subject(value) {
        if (!value) {
            console.log("Value is empty.");
        }
        this._subject = value;
    }
    constructor(iniName, iniAge, iniSubject) {
        super(iniName, iniAge);
        this._subject = iniSubject;
    }
    explainJob() {
        console.log(`I am a teacher. I teach ${this._subject}.`);
    }
}
const man = new Teacher("Takumi", 26, "mathematics");
console.log(man);
console.log(man.subject);
man.greeting();
