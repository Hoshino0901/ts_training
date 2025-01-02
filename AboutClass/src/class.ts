abstract class Person
{
    public readonly name: string;
    protected age: number;

    constructor(iniName: string, iniAge: number)
    {
        this.name = iniName;
        this.age = iniAge;
    }

    incrementAge()
    {
        this.age += 1;
    }

    greeting(this: Person): void
    {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
        this.explainJob();
    }

    abstract explainJob(): void
}

class Teacher extends Person
{
    private _subject: string;
    get subject(): string
    {
        if (!this._subject)
        {
            console.log("There is no subject.");
            return "";
        }
        return this._subject;
    }
    set subject(value: string)
    {
        if (!value)
        {
            console.log("Value is empty.")
        }
        this._subject = value;
    }

    constructor(iniName: string, iniAge: number, iniSubject: string)
    {
        super(iniName, iniAge);
        this._subject = iniSubject;
    }

    explainJob(): void 
    {
        console.log(`I am a teacher. I teach ${this._subject}.`)
    }
}

const man = new Teacher("Takumi", 26, "mathematics");
console.log(man);
console.log(man.subject);
man.greeting();