export interface IScore {
    readonly totalScore: number;
    render(): void;    
}

export interface IFood {
    element: HTMLDivElement;
    clickEventHandler(): void; 
}

export interface IFoods {
    elements: NodeListOf<HTMLDivElement>;
    readonly activeElements: HTMLDivElement[];
    readonly activeElementsScore: number[];
}
