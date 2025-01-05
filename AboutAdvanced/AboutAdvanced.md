# 応用的な使い方

## インターセクション
- `&`を用いて型のインターセクションを作成可能。
```typescript
interface Engeneer{
    name: string;
    role: string;
}

interface Blogger{
    name: string;
    follower: number;
}

type EngeneerBlogger = Engeneer & Blogger;
// EngeneerでもありBloggerでもある型となるので、次の型と同じ。
type SameEngennerBlogger = {
    name: string,
    role: string,
    follower: number
}

type strNum = string & number;
// string型でもありnumber型でもあるものは存在しないので、never型となる。
```

## typeof
- `typeof <変数>`で、変数のjava script上の型を返す。
- java script上の型しか返さないので、参照型の変数に対して`typeof`を使っても"object"としか返ってこないことに注意。
```typescript
function toUpperCase(x: string | number){
    if (typeof x === "string"){
        return x.toUpperCase();
    }
    else{
        return "";
    }
}
```

## in演算子
- `<フィールド名> in <参照型変数名>`で、その参照型変数に指定したフィールドがあるかどうかをbooleanで返す演算子。
```typescript
interface Engeneer{
    name: string;
    role: string;
}

interface Blogger{
    name: string;
    follower: number;
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
```

## instanceof
- `<参照型変数名> instanceof <クラス名>`で、その参照型変数が指定したクラスから生成された変数かどうかをbooleanで返す。
```typescript
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
```

## 型アサーション
- 特定の型であることを手動で保証する方法。
```typescript
// document.getElementById("input")は、普通に使用するとHTMLInputElement | Null型となる。
// パターン1
const input = document.getElementById("input") as HTMLInputElement;
// パターン2
const input = <HTMLInputElement> document.getElementById("input");
```

## Non-null assertion operator
- `!`をつけることで、値がNull出ないことを強制できる。
- nullに対して`!`がつけられてしまった場合はnever型が返る。
```typescript
// document.getElementById("input")は、普通に使用するとHTMLInputElement | Null型となる。
const input = document.getElementById("input")!;
// !をつけることでNullである可能性を排除
```

## インデックスシグネチャ
- インターフェースの中に入れることで、後からフィールドを自由に追加することが可能となる機能。
- `[index: <Keyの型>]: 値の型`で書く。
- 実際にあるフィールドは、インデックスシグネチャの値の型のみでなければならない。
```typescript
interface Designer{
    name: string;
    [index: string]: string;
}
const designer = Designer = {
    name: "Takumi",
    nickName: "T" // インターフェースにないフィールドも追加可能。
}
designer.firstName = "Hoshino"; // setterで追加も可能
```

## 関数のオーバーロード
- 関数の戻り値を正しくtypescriptに認識させる機能。
- 同じ引数の型に対して異なる戻り値の型を指定してオーバーラードさせた場合、上の行にある方が優先されてコンパイルされる。
- アロー関数やオブジェクトのメソッドでは使えない。
```typescript
function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number){
    if (typeof x === "string"){
        return x.toUpperCase();
    }
    else{
        return "";
    }
}
```

## Optional Changing
- 変数の後ろに`?`をつけることで、その変数がundefined型もしくはnullなら、undefinedを返し、値が正しく初期化されていればその値を返す。
```typescript
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
```

## Nullish Coalescing
- 変数の後ろに`??`をつけることで、その変数がundefined型もしくはnullなら`??`の後ろの値を返し、値が正しく初期化されていればその値を返す。
```typescript
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
console.log(dld.user ?? "no-user");
```

## LookUp型（インデックスアクセス型）
- `<参照型の名前>["<フィールド名>"]`でフィールドの型を取得する。
```typescript
// インターフェースに対して使う
interface downloadedData{
    id: number;
    user?: {
        name?:{
            first: string;
            last: string;
        }
    }
}
type id = downloadedData["id"];
// 配列に対して使う
type stringArray = string[100];
type arrayValue = stringArray[1];
// タプルに使う
type tupleEg = [string, number, boolean];
type tupleType = tupleEg[2];
```

## 関数型のインターセクション
- 関数型のインターセクションは、関数のオーバーロードになる。
```typescript
interface FuncA{
    (a: number, b: string): number;
    (a: string, b: number): number;
}

interface FuncB{
    (a: string): number;
}

let intersectionFunc: FuncA & FuncB;
intersectionFunc = function(a: number | string, b?: number | string): number {
    return 0
    }
```

## 関数のユニオン
- 関数のユニオンを型として考える場合、引数がインターセクションされ戻り値がユニオンされる。
- 「ユニオンの元の関数どちらにもなりうる」という意味なので、具体的に関数を実装すれば型は定まる。
```typescript
interface FuncC{
    (a: number, b: string): number;
}

interface FuncD{
    (a: string): string;
}
let unionFunc: FuncC | FuncD;
// unionFuncは、(a: never, b: string) => number | stringと、型としては同じになる。

unionFunc = function(a: number, b: string): number {
    return 0
    }
// 中身が実装さたので、型は(a: number, b: string): number型として定まる。 
```

## レストパラメータ（可変長引数）
- `...<変数名>: <型名>[]`で、型を指定し長さを指定しない配列を引数として取ることができる。
- 関数を使用するとき、引数は配列としてではなく、値を任意の個数引数入れるので良い。
```typescript
function tempFunc (...args: number[]): void{
    console.log(args[3]);
}
tempFunc(1, 2, 3, 4, 5, 6);
// 引数は配列ではなく値を入れる。
```