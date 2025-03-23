import { Foods } from "./foods";

export class Score {
    private static instance: Score;

    private constructor() {}

    private get _totalScore(): number {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((preVal, curVal) => preVal + curVal, 0)
    }

    public render() {
        document.querySelector('.score__number')!.textContent = String(this._totalScore)
    }

    public static getInstance(): Score {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
 }