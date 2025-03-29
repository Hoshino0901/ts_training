import { IScore } from "./interface";
import { Foods } from "./foods";

export class Score implements IScore {
    private static instance: Score;

    private constructor() {}

    get totalScore(): number {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((preVal, curVal) => preVal + curVal, 0)
    }

    public render(): void {
        document.querySelector('.score__number')!.textContent = String(this.totalScore)
    }

    public static getInstance(): Score {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
 }