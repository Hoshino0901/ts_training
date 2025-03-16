# ジェネリクスの使い方

## ジェネリクスを使って型を引数として受け取る
- `<>`を使って、型を引数として取ることが可能。
```typescript
fuciton copy<T>(value: T) {
    return value;
}
```

## `extend`
- `extend`を使ってジェネリクスの引数に制約をつける。
```typescript
fuciton copy<T extends {name: string}>(value: T) {
    return value;
}
console.log(copy({ name: "Takumi"}));
```
- クラスの引数にも使用可能。
```typescript
class LightDataBase<T extends string | number | boolean> {
    private  data: T[] = [];
    add(item: T) {
        this.data.push(item)
    }
    remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1)
    }
    get() {
        return this.data
    }
}
```
- インターフェースとジェネリクスを組み合わせることも可能。
- `Partial`で全てのフィールドをオプショナルにできる。
- `Readonly`で全てのフィールドを読み取り専用にできる。
```typescript
interface Todo {
    title: string;
    text: string;
}

type Todoable = Partial<Todo>
type ReadTodo = Readonly<Todo>
```

## `keyof`演算子
- `keyof`を使って、オブジェクトの型のキーを取り出してunion型の型にすることができる。
```typescript
type K = typeof({name: 'Takumi', age: 26})
// K = name | age
```
- '`extends`と組み合わせて使うことが多い。
```typescript
function copy3<T extends {name: string}, U extends keyof T> (value: T, key: U) {
    return value[key];
}
console.log(copy3({ name: 'Takumi', age: 26}, 'age'))
```

## `Array<T>`
- `Array<T>`を使用することでも配列の型を定義可能。
```typescript
vegetables: Array<string> = ['tomato', 'broccoli', 'asparagus']
// vegetables: string[] = ['tomato', 'broccoli', 'asparagus']と同じ。
```

## `Promise`
- `Promise`とは、非同期処理を扱うオブジェクト。
- `then`, `catch`, `finally`などのメソッドがある。
```typescript
// string型の値を返すことを保証する Promise型である。
const fetchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000);
})
// promise型の変数を作成する。その際、3000ミリ秒待ってhelloを返す。

fetchData.then(data => {
    console.log(data.toUpperCase());
})
// 非同期処理が成功した時に、返ってきた文字を大文字にしてコンソール出力する。
```

## ジェネリクスにデフォルトの引数を指定可能
- ジェネリクス`T`にデフォルトの引数を指定可能。
```typescript
interface Responsedata<T = string> {
    data: T;
    status: number;
}
```

## Mapped Types
- for文のようなロジックを入れて定義された型を、Mapping Typesと呼ぶ。
```typescript
type MappedTypes1 = {
    [P in 'tomato' | 'pumpkiun']: P
}
// これはすなわち、
type MappedTypes1 = {
    tomato: "tomato";
    pumpkiun: "pumpkiun";
}
// とおなじ。
```
- `keyof`演算子も使用可能。
- `keyof`演算子を使用した時、`readonly`やoptional`?`は引き継がれる。
```typescript
interface Fruits {
    readonly banana: string;
    apple?: string;
}

type MappedTypes2 = {
    [P in keyof Fruits]: P
}
```

## Conditional Types
- 三項演算子のようなロジックをいれて定義された型を、Conditional Typesと呼ぶ。
```typescript
type ConditionalTypes = 'tomato' extends string ? number : boolean;
// ConditionalTypes = stringとなる。

```
- `infer`を用いて、推論しつつその推論した型を使用可能。
```typescript
type ConditionalTypesInfer = { 'tomato': string } extends { 'tomato': infer R } ? R : boolean
// string型になる。
type ConditionalTypesInfer = { 'potato': string } extends { 'tomato': infer R } ? R : boolean
// boolean型になる。
```

## テンプレートリテラル型
- 文字列に変数を代入するときと同様に型を代入することが可能。
```typescript
type FirstName = 'John'
type LastName = 'Lennon'
type UserName = `${FirstName}-${LastName}`;
// type UserName = "John-Lennon"
```
- ユニオン型がある場合は全パターンを網羅する。
```typescript
type FirstName1 = 'John' | 'Michel'
type LastName1 = 'Lennon' | `Jacson`
type UserName1 = `${FirstName1}-${LastName1}`;
// type UserName1 = "John-Lennon" | "John-Jacson" | "Michel-Lennon" | "Michel-Jacson"
```