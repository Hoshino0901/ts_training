# インターフェース
### インターフェース内のメソッド
- インターフェース内のメソッドは複数の書き方が可能。
```typescript
// 通常のメソッドの書き方（アロー関数）
interface Human{
    name: string;
    age: number;
    greeting: (message: string) => void;
}
// インターフェース独自の書き方
interface Human{
    name: string;
    greeting(message: string): void;
}
```

### インターフェースの継承
- `implement`を使用。
- `implement`は複数のインターフェースを並べることが可能（すなわち、複数のインターフェースを継承可能。抽象クラスは不可能）。
- `implement`と`extends`は併用可能。
```typescript
interface Human{
    name: string;
    greeting(message: string): void;
}

class Developer implements Human{
    name: string;
    constructor(iniName: string){
        this.name = iniName;
    }
    greeting(message: string): void {
        console.log(message);
    }
```
- インターフェースの中のフィールドがreadonlyだった場合でも、そのインターフェースを継承したフィールドはreadonlyにしなくても良い。
```typescript
interface Human{
    readonly name: string;
    greeting(message: string): void;
}

class Developer implements Human{
    name: string; // readonlyにしなくても良い。
    constructor(iniName: string){
        this.name = iniName;
    }
    greeting(message: string): void {
        console.log(message);
    }

const man1: Human = {
    name: "Takumi"
}
man1.name = "Taro"; // インターフェース自身を型としてるので書き換え不可
const man2 = new Developer("Takumi");
man2.name = "Taro"; // インターフェースを継承したクラスを使用しているので書き換え可
```

- インターフェースがインターフェースを継承するときは`extends`を使用。
- 複数のインターフェースを継承可能。

### インターフェースで関数の型を定義
```typescript
//　通常の関数の型の定義
type addFunc = (num1: number, num2: number) => number;

// インターフェースを使った型の定義
interface addFunc{
    (num1: number, num2: number): number;
}
```
- `new`をつけることでコンストラクタ関数の型として定義も可能。
```typescript
interface func{
    new (num1: number, num2: number): object;
}
function tempFunc(f: func){
    let temp = new f(1, 2);
    // コンストラクタ関数fを用いてインスタンスを作成。
}
```

### オプショナルプロパティ
- フィールドやメソッドに`?`をつけることで、あってもなくてもよいメンバを作成可能。このとき、フィールドの型はundefined型とのunion型になることに注意。
```typescript
interface Human{
    name: string;
    nickName?: string;
    greeting?(message: string): void;
}
```

###　オプショナルパラメータ
- メソッドの引数に`?`をつけることで、あってもなくても良いパラメータにすることが可能。このとき、パラメータの型はundefined型とのunion型になることに注意。
```typescript
greeting(message?: string){
    console.log(message);
};
// messageはstring | undefined型となる。
```
