# クラス
### コンストラクタ
- `this`を使って自身のフィールドにアクセスする。
```typescript
constructor(iniName: string)
    {
        this.name = iniName;
    }
```

### メソッド
- `function`は書かずに定義。
- `this`はメソッドの左側に来るインスタンスを指す。
- メソッドの引数に`this` を加え、型の指定をすることが可能。
```typescript
greeting(this: {name: string}) // thisはnameというstring型のフィールドを持っているインスタンスのみ。
    {
        console.log(`Hello! My name is ${this.name}`);
    }

    // 使用例
    class Person
    {
        name: string;
        constructor(iniName: string)
        {
            this.name = iniName;
        }

        greeting(this: {name: string})
        {
            console.log(`Hello! My name is ${this.name}`);
        }
    }
    const person1 = new Person("Takumi");
    person1.greeting(); // ok

    const person2 = 
    {
        name: "Taro",
        greeting: person1.greeting
    }
    person2.greeting(); // ok
    // person2のgreetingメソッドは、person1のgreetingメソッドとして定義されている。


    const person3 = 
    {
        greeting: person1.greeting
    }
    person3.greeting() // ng
```
### フィールドの初期化を省略する方法
- コンストラクタの変数に直接修飾子を入れる。
```typescript
constructor(public name: string, private age: number)
    {

    }
```

### readonly
- クラス内外で読み取り専用にする。
- クラス内のコンストラクタのみ書き換え可能。
```typescript
public readonly name:
private age:
constructor(iniName: string, iniAge: number)
    {
        this.name = iniName;
    }
```

### extends
- クラスの継承が可能。
- メソッドの上書きをしたい場合は、同じ名前のメソッドで定義すればOK。
```typescript
class Person
{
    readonly ndame:
    private age:
    constructor(iniName: string, iniAge: number)
    {
        this.name = iniName;
        this.age = iniAge;
    }
}

class Teacher extends Person
{

}
// これでTeacherはPersonを継承。
```
- 継承時にコンストラクタを作りたい場合は、`super`関数を使用する。
```typescript
class Teacher extends Person
{
    constructor(iniName: string, iniAge: number)
    {
        super(iniName, iniAge);
    }
}
```
- 継承時に、継承前のメソッドを使いたい場合は`super.<メソッド名>()`で使う。
```typescript
class Person
{
    readonly ndame:
    private age:
    constructor(iniName: string, iniAge: number)
    {
        this.name = iniName;
        this.age = iniAge;
    }
    greeting()
    {
        console.log("Hello!");
    }
}

class Teacher extends Person
{
    constructor(iniName: string, iniAge: number)
    {
        super(iniName, iniAge);
        super.greeting(); // super.<メソッド名>()で使用
    }
}
```

### protected修飾子
- privateの範囲を、クラスの継承先まで広げることが可能。
```typescript
class Person
{
    protected readonly name: string;

    constructor(iniName: string)
    {
        this.name = iniName;
    }

    greeting(this: Person): void
    {
        console.log(`Hello! My name is ${this.name}.`);
    }
}

class Teacher extends Person
{
    public readonly subject: string;
    constructor(iniName: string, iniSubject: string)
    {
        super(iniName);
        this.subject = iniSubject;
    }

    greeting(this: Teacher): void 
    {
        console.log(`Hello! My name is ${this.name}. I teach ${this.subject}.`);
    }
}
```

### getter, setter
- getter
```typescript
get subject(): string
    {
        if (!this._subject)
        {
            console.log("There is no subject.");
            return "";
        }
        return this._subject;
    }
```
- setter
```typescript
set subject(value: string): void
    {
        if (!value)
        {
            console.log("Value is empty.")
        }
        this._subject = value;
    }
```
- getterとsetterは同じ名前を使うことができる。同じ名前を使用するときは、getterの戻り値とsetterの引数の型が同じ必要がある。

# static
- staticを最初につけることで、staticフィールドやstaticメソッドを作成可能。
- インスタンスに対してはstaticフィールドやstaticメソッドは使用できないことに注意。
```typescript
static isAdult(age: number): boolean
{
    if (age > 17)
    {
        return true;
    }
    return false;
}
```

### abstract
- abstractクラス内で、abstractメソッドを定義可能。
- abstractクラスを継承したクラスは、abstractメソッドの中身を必ず実装しなければならない。
- abstractメソッドは戻り値の型を指定する必要あり。
- abstractクラスはインスタンスを生成できない。
```typescript
abstract class Person
{
    public readonly name: string;

    constructor(iniName: string, iniAge: number)
    {
        this.name = iniName;
    }

    greeting(this: Person): void
    {
        console.log(`Hello! My name is ${this.name}.`);
        this.explainJob();
    }

    abstract explainJob(): void
}

class Teacher extends Person
{
    private _subject: string;
    constructor(iniName: string, iniSubject: string)
    {
        super(iniName);
        this._subject = iniSubject;
    }

    explainJob(): void 
    {
        console.log(`I am a teacher. I teach ${this._subject}.`)
    }
}
```