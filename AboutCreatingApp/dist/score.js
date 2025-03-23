"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Score = void 0;
const foods_1 = require("./foods");
class Score {
    constructor() { }
    get _totalScore() {
        const foods = foods_1.Foods.getInstance();
        return foods.activeElementsScore.reduce((preVal, curVal) => preVal + curVal, 0);
    }
    render() {
        document.querySelector('.score__number').textContent = String(this._totalScore);
    }
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
exports.Score = Score;
