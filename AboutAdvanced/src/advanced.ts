interface Engeneer{
    name: string;
    role: string;
}

interface Blogger{
    name: string;
    follower: number;
}

type EngeneerBlogger = Engeneer & Blogger;

function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number): string | number{
    if (typeof x === "string"){
        return x.toUpperCase();
    }
    else{
        return x;
    }
}

type NomadWoriker = Engeneer | Blogger;
function describeProfile(nw: NomadWoriker){
    if ('role' in nw){
        console.log(nw.role);
    }
    else if ('follower' in nw){
        console.log(nw.follower);
    }
}

class Dog{
    speak(){
        console.log("bow-bow");
    }
}

class Bird{
    speak(){
        console.log("tweet-tweet");
    }
    fly(){
        console.log("flatter");
    }
}

function havepet(pet: Dog | Bird){
    pet.speak();
    if (pet instanceof Bird){
        pet.fly();
    }
}

havepet(new Bird());

interface Designer{
    name: string;
    [index: string]: string;
}
const designer: Designer = {
    name: "Takumi",
    nickName: "T"
}
designer.firstName = "Hoshino";

interface downloadedData{
    id: number;
    user?: {
        name?:{
            first: string;
            last: string;
        }
    }
}
const dld: downloadedData = {
    id: 1
}
console.log(dld.user?.name?.first);
console.log(dld.user ?? "no-user");

type id = downloadedData["id"];

type stringArray = string[100];
type arrayValue = stringArray[1];

type tupleEg = [string, number, boolean];
type tupleType = tupleEg[2];

interface FuncA{
    (a: number, b: string): number;
    (a: string, b: number): number;
}

interface FuncB{
    (a: string): number;
}

let intersectionFunc: FuncA & FuncB;
intersectionFunc = function(a: number | string, b?: number | string): number {return 0}

interface FuncC{
    (a: number, b: string): number;
}

interface FuncD{
    (a: string): string;
}
let unionFunc: FuncC | FuncD;
unionFunc = function(a: number, b: string): number {return 0}

function tempFunc (...args: number[]): void{
    console.log(args[3]);
}

tempFunc(1, 2, 3, 4, 5, 6);