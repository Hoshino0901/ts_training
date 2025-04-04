"use strict";
class Score {
    constructor() { }
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((preVal, curVal) => preVal + curVal, 0);
    }
    render() {
        document.querySelector('.score__number').textContent = String(this.totalScore);
    }
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
class Food {
    // element: HTMLDivElement; コンストラクタの引数にpublicをつけることで省略できる。
    constructor(element) {
        this.element = element;
        element.addEventListener('click', this.clickEventHandler.bind(this));
        // もしbind(this)を使うとどうなるか？
        // addEventListenerの引数で、なおかつbindの引数でないthiは、this = elementになってしまう。
        // より一般にはaddEventListenerに限らず、引数に渡された関数（この場合はclickEventHandler）に関わるthisは、呼び出されたときの状況によって変わってしまう。
        // 一方bind(thisValue)を使うと、そのメソッド（この場合はclickEventHandler）のthisが指すものをthisValueにすることができる。
        // さらにbindの引数にthisを使うと、bindを呼び出したメソッドが所属しているクラスのインスタンスを指すことができる。
        // bindはclickEventHandlerが呼び出しており、clickEventHandlerはFoodクラスのインスタンスに所属しているのでthisはFoodクラスのインスタンス。
    }
    clickEventHandler() {
        this.element.classList.toggle('food--active');
        const score = Score.getInstance();
        score.render();
    }
}
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
            new Food(element);
        });
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();
