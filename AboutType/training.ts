let hasValue : boolean = false;
let integer : number = 10;
let float : number = 3.14;
let minus : number = -10;
let doubleQuatation : string = "hello";
let singleQuotation : string = 'hello';
let backQuotation : string = `hello`;
////////////////////////////////////////////////////////////////////////////////////
let Person1: {
    age: number;
    name: string;
} = {
    age: 20,
    name: "Luke"
}

let Preson2 = {
    age: 25,
    name: "Jack"
}
////////////////////////////////////////////////////////////////////////////////////
let fruits1: string[] = ["Apple", "Banana", "Grape"]
console.log(fruits1)
let fruits2 = ["Orange", "Tomato"]
fruits1.push("Lemon")
console.log(fruits1)
////////////////////////////////////////////////////////////////////////////////////
let book: [string, number, boolean] = ["magazine", 1000, true]
////////////////////////////////////////////////////////////////////////////////////
enum CoffeeSize {
    SHORT,
    TALL,
    GRANDE,
    VENDI
}

const Coffee = {
    isHot: true,
    size: CoffeeSize.TALL

}
////////////////////////////////////////////////////////////////////////////////////
let anything1: any = true;
anything1 = "hello";
anything1 = 10;

let anything2: any = "Hello!";
let word: string = "Hi!";
console.log(word)
word = anything2;
console.log(word)
////////////////////////////////////////////////////////////////////////////////////
let strOrNum: number | string = 10;
strOrNum = "Hello";
let styOrNums: (string | number)[] = [10, "Hello"]
////////////////////////////////////////////////////////////////////////////////////
let apple1: "apple" = "apple";

// apple1 = "Orange" // エラー

const apple = "apple"

let size1: "small" | "medium" | "large";

let cloth:
{
    color: string;
    size: "small" | "medium" | "large"
} = {
    color: "white",
    size: "small" 
}

type clothSize = "small" | "medium" | "large"
let size2: clothSize;
////////////////////////////////////////////////////////////////////////////////////
function SayHello1(): void{
    console.log("Hello!");
}

function SayHello2(): undefined{
    console.log("Hello!");
    return; // returnがないとエラー
}
////////////////////////////////////////////////////////////////////////////////////
function Add(n1: number, n2: number): number
{
    return n1 + n2;
}

const AnotherAdd1 = Add;

const AnotherAdd2: (n1: number, n2: number) => number = Add;

const AnotherAdd3: (n1: number, n2: number) => number = function (n1:number, n2: number): number
{
    return n1 + n2;
}

const AnotherAdd4 = function (n1:number, n2: number): number
{
    return n1 + n2;
}

const AnotherAdd5: (n1: number, n2: number) => number = function(n1, n2)
{
    return n1 + n2;
}

const DoubleNumber: (num: number) => number = num => num * 2
////////////////////////////////////////////////////////////////////////////////////
function DoubleAndHandle(num: number, cb: (number) => number): void
{
    const doubleNumber = cb(num);
    console.log(doubleNumber);
}
////////////////////////////////////////////////////////////////////////////////////
let unknownInput: unknown;
unknownInput = "Hello";
unknownInput = 10;
unknownInput = true;
////////////////////////////////////////////////////////////////////////////////////
10 satisfies number;
const num = 10 satisfies number;
////////////////////////////////////////////////////////////////////////////////////
function ReturnError(message: string): never
{
    throw new Error(message);
}
console.log(ReturnError("Error!!!!!!!!!"));

const error = (message: string) =>
{
    throw new Error(message);
}

function GetSizeName(size: "s" | "m" | "l")
{
    switch (size)
    {
        case "s": return "small";
        case "m": return "medium";
        case "l": return "large";
        default: return size satisfies never
    }
}
