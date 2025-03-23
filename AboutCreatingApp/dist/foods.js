"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foods = void 0;
const food_1 = require("./food");
class Foods {
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeEmementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                this._activeEmementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeEmementsScore;
    }
    constructor() {
        this.elements = document.querySelectorAll('.food');
        this._activeElements = [];
        this._activeEmementsScore = [];
        this.elements.forEach(element => {
            new food_1.Food(element);
        });
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
exports.Foods = Foods;
