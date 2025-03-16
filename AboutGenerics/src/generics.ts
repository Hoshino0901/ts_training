function copy<T>(value: T) {
    return value;
}
console.log(copy<string>("hello").toUpperCase);

function copy2<T extends {name: string}>(value: T) {
    return value;
}
console.log(copy({ name: "Takumi"}));

function copy3<T extends {name: string}, U extends keyof T> (value: T, key: U) {
    return value[key];
}
console.log(copy3({ name: 'Takumi', age: 26}, 'age'))

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

const stringLightDatabase = new LightDataBase<string>();
stringLightDatabase.add('banana');
stringLightDatabase.add('apple');
stringLightDatabase.add('grape');
stringLightDatabase.remove('apple');
console.log(stringLightDatabase.get());

interface Todo {
    title: string;
    text: string;
}

type Todoable = Partial<Todo>
type ReadTodo = Readonly<Todo>

const fetchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
            resolve('hello');
    }, 3000);
})
fetchData.then(data => {
    console.log(data.toUpperCase());
})

interface Responsedata<T = string> {
    data: T;
    status: number;
}

type MappedTypes1 = {
    [P in 'tomato' | 'pumpkiun']: P
}

interface Fruits {
    readonly banana: string;
    apple?: string;
}

type MappedTypes2 = {
    [P in keyof Fruits]: P
}

type ConditionalTypes = 'tomato' extends string ? number : boolean;
type ConditionalTypesInfer = { 'tomato': string } extends { 'tomato': infer R } ? R : boolean

type FirstName = 'John'
type LastName = 'Lennon'
type UserName = `${FirstName}-${LastName}`;

type FirstName1 = 'John' | 'Michel'
type LastName1 = 'Lennon' | `Jacson`
type UserName1 = `${FirstName1}-${LastName1}`;