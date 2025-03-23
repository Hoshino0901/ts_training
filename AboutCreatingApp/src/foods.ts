import { Food } from "./food";

export class Foods { 
    private static instance: Foods;
    public elements: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.food');
    private _activeElements: HTMLDivElement[] = [];
    private _activeEmementsScore: number[] = [];

    get activeElements(): HTMLDivElement[] {
        this._activeElements = [];
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        })
        return this._activeElements;
    }
    get activeElementsScore(): number[] {
        this._activeEmementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore)
            {
                this._activeEmementsScore.push(Number(foodScore.textContent))
            }
            })
        return this._activeEmementsScore;
    }

    private constructor() {
        this.elements.forEach(element => {
            new Food(element);
        } )
    }

    public static getInstance(): Foods {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}