var hasValue = false;
var integer = 10;
var float = 3.14;
var minus = -10;
var doubleQuatation = "hello";
var singleQuotation = 'hello';
var backQuotation = "hello";
////////////////////////////////////////////////////////////////////////////////////
var Person1 = {
    age: 20,
    name: "Luke"
};
var Preson2 = {
    age: 25,
    name: "Jack"
};
////////////////////////////////////////////////////////////////////////////////////
var fruits1 = ["Apple", "Banana", "Grape"];
console.log(fruits1);
var fruits2 = ["Orange", "Tomato"];
fruits1.push("Lemon");
console.log(fruits1);
////////////////////////////////////////////////////////////////////////////////////
var book = ["magazine", 1000, true];
////////////////////////////////////////////////////////////////////////////////////
var CoffeeSize;
(function (CoffeeSize) {
    CoffeeSize[CoffeeSize["SHORT"] = 0] = "SHORT";
    CoffeeSize[CoffeeSize["TALL"] = 1] = "TALL";
    CoffeeSize[CoffeeSize["GRANDE"] = 2] = "GRANDE";
    CoffeeSize[CoffeeSize["VENDI"] = 3] = "VENDI";
})(CoffeeSize || (CoffeeSize = {}));
var Coffee = {
    isHot: true,
    size: CoffeeSize.TALL
};
////////////////////////////////////////////////////////////////////////////////////
var anything1 = true;
anything1 = "hello";
anything1 = 10;
var anything2 = "Hello!";
var word = "Hi!";
console.log(word);
word = anything2;
console.log(word);
////////////////////////////////////////////////////////////////////////////////////
var strOrNum = 10;
strOrNum = "Hello";
var styOrNums = [10, "Hello"];
////////////////////////////////////////////////////////////////////////////////////
var apple1 = "apple";
// apple1 = "Orange" // エラー
var apple = "apple";
var size1;
var cloth = {
    color: "white",
    size: "small"
};
var size2;
////////////////////////////////////////////////////////////////////////////////////
function SayHello1() {
    console.log("Hello!");
}
function SayHello2() {
    console.log("Hello!");
    return; // returnがないとエラー
}
////////////////////////////////////////////////////////////////////////////////////
function Add(n1, n2) {
    return n1 + n2;
}
var AnotherAdd1 = Add;
var AnotherAdd2 = Add;
var AnotherAdd3 = function (n1, n2) {
    return n1 + n2;
};
var AnotherAdd4 = function (n1, n2) {
    return n1 + n2;
};
var AnotherAdd5 = function (n1, n2) {
    return n1 + n2;
};
var DoubleNumber = function (num) { return num * 2; };
////////////////////////////////////////////////////////////////////////////////////
function DoubleAndHandle(num, cb) {
    var doubleNumber = cb(num);
    console.log(doubleNumber);
}
////////////////////////////////////////////////////////////////////////////////////
var unknownInput;
unknownInput = "Hello";
unknownInput = 10;
unknownInput = true;
////////////////////////////////////////////////////////////////////////////////////
10;
var num = 10;
////////////////////////////////////////////////////////////////////////////////////
function ReturnError(message) {
    throw new Error(message);
}
console.log(ReturnError("Error!!!!!!!!!"));
