import { IFood } from "./interface";
import { Score } from "./score";

export class Food implements IFood {
    // element: HTMLDivElement; コンストラクタの引数にpublicをつけることで省略できる。
    constructor(public element: HTMLDivElement) {
        element.addEventListener('click', this.clickEventHandler.bind(this));
        // もしbind(this)を使うとどうなるか？
        // addEventListenerの引数で、なおかつbindの引数でないthiは、this = elementになってしまう。
        // より一般にはaddEventListenerに限らず、引数に渡された関数（この場合はclickEventHandler）に関わるthisは、呼び出されたときの状況によって変わってしまう。
        // 一方bind(thisValue)を使うと、そのメソッド（この場合はclickEventHandler）のthisが指すものをthisValueにすることができる。
        // さらにbindの引数にthisを使うと、bindを呼び出したメソッドが所属しているクラスのインスタンスを指すことができる。
        // bindはclickEventHandlerが呼び出しており、clickEventHandlerはFoodクラスのインスタンスに所属しているのでthisはFoodクラスのインスタンス。
    }

    clickEventHandler(): void {
        this.element.classList.toggle('food--active');
        const score = Score.getInstance();
        score.render();
    }
 }