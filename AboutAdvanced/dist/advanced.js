"use strict";
var _a, _b, _c;
function toUpperCase(x) {
    if (typeof x === "string") {
        return x.toUpperCase();
    }
    else {
        return x;
    }
}
function describeProfile(nw) {
    if ('role' in nw) {
        console.log(nw.role);
    }
    else if ('follower' in nw) {
        console.log(nw.follower);
    }
}
class Dog {
    speak() {
        console.log("bow-bow");
    }
}
class Bird {
    speak() {
        console.log("tweet-tweet");
    }
    fly() {
        console.log("flatter");
    }
}
function havepet(pet) {
    pet.speak();
    if (pet instanceof Bird) {
        pet.fly();
    }
}
havepet(new Bird());
const designer = {
    name: "Takumi",
    nickName: "T"
};
designer.firstName = "Hoshino";
const dld = {
    id: 1
};
console.log((_b = (_a = dld.user) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.first);
console.log((_c = dld.user) !== null && _c !== void 0 ? _c : "no-user");
let intersectionFunc;
intersectionFunc = function (a, b) { return 0; };
let unionFunc;
unionFunc = function (a, b) { return 0; };
function tempFunc(...args) {
    console.log(args[3]);
}
tempFunc(1, 2, 3, 4, 5, 6);
