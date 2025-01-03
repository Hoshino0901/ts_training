interface Human{
    readonly name: string;
    age?: number;
    greeting(message?: string): void;
}

class Developer implements Human{
    name: string;
    age: number;
    experience: number;
    constructor(iniName: string, iniAge: number, iniExpe: number){
        this.name = iniName;
        this.age = iniAge;
        this.experience = iniExpe;
    }
    greeting(message: string): void {
        console.log(message);
    }
}

const man1: Human ={
    name: "Takumi",
    age: 26,
    greeting(): void {
        console.log("Hello!");
    }
} 
// man1.name = "Taro";
const man2 = new Developer("Takumi", 26, 3);
man2.name = "Taro"

