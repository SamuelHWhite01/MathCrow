import Carry from './Carry';
class Factors {
    index: number;
    factor1: number;
    factor2: number;
    product: number;
    productList: number[] = [];
    factorsOrder: number[]; // random order of numbers to multiply against the level in times table mode
    productGridList: number[] = [];
    numGridCorrect: number = 0;
    carryList: Carry[] = [];
    resetCounter: number = 0;
    numCarryCorrect: number = 0;
    constructor(factor1: number) {
        this.index = 0;
        this.factorsOrder = [];
        for (let i = 1; i <= 12; i++) {
            this.factorsOrder.push(i);
        }
        this.factorsOrder = this.shuffleArray(this.factorsOrder);

        this.factor1 = factor1;
        this.factor2 = this.factorsOrder[this.index];
        this.product = this.factor1 * this.factor2;
        this.productList = this.initProductList(this.product);
        [this.productGridList, this.carryList] = this.initAnswers();
    }
    private initProductList(product:number)
    {
        const output:number[] = []
        for(let i = 0; i<this.product.toString().length; i++)
        {
            output.push(parseInt(product.toString()[i]))
        }
        return output;
    }
    private initAnswers(): [number[], Carry[]] {
        // will initialize the array with each number as it should be input. This will deprecate the productGrid component when it is complete
        const answerOutput: number[] = [];
        const carryOutput: Carry[] = [];
        const f1string: string = this.factor1.toString();
        const f2string: string = this.factor2.toString();
        let numZeroes: number = 0;
        const rowlen: number = this.product.toString().length;
        let curlen: number = 0;
        for (
            let i = f2string.length - 1;
            i >= 0;
            i-- //starting from the end of factor 2 and going back
        ) {
            curlen = 0;
            for (
                let s = 0;
                s < numZeroes;
                s++ // adding trailing zeroes for each 10's place of factor 2
            ) {
                answerOutput.push(0);
                curlen++;
            }
            let carryVal: number = 0;

            for (
                let j = f1string.length - 1;
                j >= 0;
                j-- //starting from the end of factor 1 and going back
            ) {
                const f1 = parseInt(f1string[j]);
                const f2 = parseInt(f2string[i]);
                let product = f1 * f2 + carryVal;
                carryVal = Math.floor(product / 10);
                product = product % 10;
                answerOutput.push(product);
                curlen++;
                if (carryVal > 0 && curlen <f1string.length) {
                    // if there is a carry, and its place would affect a future multiplication
                    const newcarry: Carry = {
                        value: carryVal,
                        place: rowlen - curlen-1,
                        order: answerOutput.length,
                    };
                    carryOutput.push(newcarry);
                }
            }

            if (carryVal > 0) {
                // if there is a carry after multiplying, it should be added as a regular answer
                answerOutput.push(carryVal);
                curlen++;
            }
            for (
                curlen;
                curlen < rowlen;
                curlen++ // adding leading 0s to pad out the answer list
            ) {
                answerOutput.push(0);
            }
            numZeroes++;
        }
        return [answerOutput, carryOutput];
    }
    public Next() {
        if (this.index < 10) {
            this.index += 1;
            this.factor2 = this.factorsOrder[this.index];
            this.product = this.factor1 * this.factor2;
            this.productList = this.initProductList(this.product);
            [this.productGridList, this.carryList] = this.initAnswers();
            this.numGridCorrect = 0;
            this.numCarryCorrect = 0;
            this.resetCounter++;
        } else {
            this.index = 0;
            this.factorsOrder = this.shuffleArray(this.factorsOrder);
            this.factor2 = this.factorsOrder[this.index];
            this.product = this.factor1 * this.factor2;
            this.productList = this.initProductList(this.product);
            [this.productGridList, this.carryList] = this.initAnswers();
            this.numGridCorrect = 0;
            this.numCarryCorrect = 0;
            this.resetCounter++;
        }
    }
    public CorrectGrid() {
        this.numGridCorrect += 1;
    }
    public CorrectCarry(){
        this.numCarryCorrect +=1;
    }
    public NextCarry(){
        if (this.carryList[this.numCarryCorrect] !== undefined)
        {
            return this.carryList[this.numCarryCorrect]
        }
        return undefined
    }
    public Clone() {
        const newInstance = new Factors(this.factor1);
        newInstance.index = this.index;
        newInstance.factorsOrder = this.factorsOrder;
        newInstance.factor1 = this.factor1;
        newInstance.factor2 = this.factor2;
        newInstance.product = this.product;
        newInstance.productList = this.productList;
        newInstance.numGridCorrect = this.numGridCorrect;
        newInstance.productGridList = this.productGridList;
        newInstance.carryList = this.carryList;
        newInstance.resetCounter = this.resetCounter;
        newInstance.numCarryCorrect = this.numCarryCorrect;
        return newInstance;
    }

    public SetLevel(factor1: number) {
        this.factor1 = factor1;
        this.index = 12;
        this.Next();
    }
    private shuffleArray(arr: number[]): number[] {
        const shuffled = [...arr]; // Create a copy to avoid mutating the original array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}
export default Factors;
