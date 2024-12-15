# 型

### 基本的な型
- `boolean` : `true` or `false`
- `string` : `""`, `''`, ` `` `のどれでもOK
- `number`: int型, double型, float型全てがこの型

## 型注釈と型推論
- 型注釈は型を明記すること
```typescript
let isRight: boolean; 
```

- 型推論はコンパイラに型の決定を任せること
```typescript
let name = "Luke"; // stringと推論される
```

## オブジェクト型
```typescript
// 型注釈での書き方
let person:{
    age: number;
    name: string
} = {
    age: 20,
    name: "Luke"
}
```
```typescript
// 型推論での書き方
let person = {
    age: 20,
    name: "Luke"
}
```

## 配列
```typescript
// 型注釈での書き方
let fruits: string[] = ["Apple", "Banana", "Orange"]
fluits.push("Grape") // 新規で追加
```

```typescript
// 型推論での書き方
let integers = [1, 1, 2, 3, 5, 8, 13]
```

## Tuple型
```typescript
// 配列の中身の型を各要素ごとに指定できる
let book: [string, number, boolean] = ["magazine", 1000, true]
```

## Enum型
```typescript
// Enumを定義
enum CoffeeSize {
    SHORT,
    TALL,
    GRANDE,
    VENDI
}

// Enumを使う
let Coffee = {
    isHot: true,
    size: CoffeeSize.TALL
}
```

## any型
- any型 : どんな型を入れることもできる
- pointerの概念とは違い、再代入で別の型を入れることも可能
- バグの温床なので使わないのがbetter
```typescript
let anything: any = true;
anything = "hello"
anything = 10;
```
- any型の変数を値型の変数に代入することも可能
```typescript
let anyting: any = "Hello!"
let word = "Hi!";
word = anything; // "Hello!"がwordに代入された
anything = 10;
word = anything; // これもコンパイルできてしまう、それはすなわちstring型にもnumber型が代入できてしまうということ
```

## Union型
- その変数が複数の型を取りうるものにしたいときに使う
```typescript
let strOrNum: number | string = 10;
strOrNum = "Hello";
let styOrNums: (string | number)[] = [10, "Hello"]
```

## Literal型
- string型の値のみを取る型
```typescript
let apple: "apple" = "apple";
apple = "Orange" // エラー
```
- const型と使うと自動でLiteral型になる
```typescript
const apple = "apple";
```
- Union型と組み合わせることで、Enumのような使い方が可能
```typescript
let size: "small" | "medium" | "large"; // "small", "medium", "large"のいずれかしか取り得ない変数
```
```typescript
// オブジェクトで使うと威力を発揮
let cloth:{
    color: string;
    size: "small" | "medium" | "large"
} = {
    color: "White",
    size: "small" // "small", "medium", "large"以外を入れるとエラー
}
```

## typeのエイリアス化
- typeのエイリアス化をすることが可能
```typescript
type clothSize = "small" | "medium" | "large" // typeのエイリアス化で型に名前をつける
let size: clothSize; // "small", "medium", "large"しか取れない変数
```

## 関数の型
- 関数の型の書き方
```typescript
function add(a: number, b: number): number {
    return a + b;
}
```
- 戻り値は型推論可能だが、引数は型推論できなく、型指定をしなければany型になる。

## void型関数とundefined型
- jsのvoid型関数は`undefined`を返す。`undefined`は型の名前。
```typescript
// オーソドックスなvoid型で定義
function SayHello(): void{
    console.log("Hello!");
}
```
```typescript
// undefined型の変数を返すように書く
function SayHello(): undefined{
    console.log("Hello!");
    return; // returnがないとエラー
}
```
