import Carry from './Carry';
import UserData from './UserData';
class Factors {
    index: number; // how far through a set of timestable problems we are
    factor1: number; // number version of the first factor
    factor2: number; // number version of the second factor
    product: number; // number version of the third factor
    productList: number[] = []; // product deconstructed into individual digits
    factorsOrder: number[]; // random order of numbers to multiply against the level in times table mode
    productGridList: number[] = []; // answer to product grid in expected order
    numGridCorrect: number = 0; // number times a correct answer for the product grid list has been given
    numCarryCorrect: number = 0; // number of times the user has correctly answered a carry
    numSumCorrect: number = 0; // number of times the user has correctly answered the sim
    carryList: Carry[] = []; // list of carries that are present in the problem
    rawMultList:number[] = []; // raw list of the value you get by multiplying each number in factor 1 against each number in factor 2
    carrySumList:number[] = []; // list of carries added to the raw mult list for the appropriate pairs
    sumCarryList:Carry[] = [];
    numSumCarryCorrect:number = 0; // number of sumCarries that have been correctly answered
    resetCounter: number = 0; // reset watched to update elements that use factors
    difficulty:number = 1; // used to deermine length of long mulciplication
    constructor() {
        this.index = 0;
        this.factorsOrder = [];
        this.factorsOrder = [9,1,2,3,4,5,6,7,8,10,11,12]
        this.factorsOrder = this.shuffleArray(this.factorsOrder);

        this.factor1 = 12;
        this.factor2 = this.factorsOrder[this.index];
        this.product = this.factor1 * this.factor2;
        this.productList = this.initProductList(this.product);
        [this.productGridList, this.carryList, this.rawMultList, this.carrySumList] = this.initAnswers();
        this.sumCarryList = this.initSumCarryList()
    }
    private initSumCarryList()
    {
        const sumCarryOutput:Carry[] = []
        let rowLen = this.productList.length
        let colLen = this.factor2.toString().length
        const grid: number[][] = [];
        for (let row = 0; row < colLen; row++) {
            const start = row * rowLen;
            const end = start + rowLen;
            grid.push(this.productGridList.slice(start, end));
        }
        let carryVal = 0;
        for (let i = 0;i< grid[0].length;i++) //for each col
        {
            let baseTotal = 0;
            let primaryCarry = false;
            for(let j = 0; j<grid.length;j++) //for each number in that col
            {
                baseTotal += grid[j][i]
            }
            if(baseTotal > 9)
            {
                primaryCarry = true
            }
            let modifiedTotal = carryVal + baseTotal
            carryVal = Math.floor(modifiedTotal / 10)
            if(carryVal > 0)
            {
                let newCarry:Carry = {
                    value:carryVal,
                    primary:primaryCarry,
                    order:i,
                    place:rowLen-i-2,
                }
                sumCarryOutput.push(newCarry)
            }
            
        }
        return sumCarryOutput;
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
    private initAnswers(): [number[], Carry[], number[], number[]] {
        // will initialize the array with each number as it should be input. This will deprecate the productGrid component when it is complete
        const carrySumOutput:number[] = [];
        const answerOutput: number[] = [];
        const carryOutput: Carry[] = [];
        const rawMultOutput: number[] = [];
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
                let primaryCarry = false;
                let product = f1 * f2 + carryVal;
                if(f1*f2 === product) // simply check to see if the raw numbers themselves would produce a carry
                {
                    primaryCarry = true;
                }
                carrySumOutput.push(product)
                rawMultOutput.push(f1*f2);
                carryVal = Math.floor(product / 10);
                product = product % 10;
                answerOutput.push(product);
                curlen++;
                if (carryVal > 0) {
                    // if there is a carry, 
                    const newcarry: Carry = {
                        value: carryVal,
                        place: rowlen - curlen-1,
                        order: answerOutput.length-1,
                        primary: primaryCarry,
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
        return [answerOutput, carryOutput, rawMultOutput, carrySumOutput];
    }
    public next(userData:UserData) // when supplied with a mode, will disambiguate and use the correct next
    {
        if(userData.settings.mode === "SelectedFactor")
        {
            this.selectedFactorNext()
        }
        else if( userData.settings.mode === "TimesTableAuto" && userData.timesTableData.historyGrid)
        {
            this.autoNext(userData.timesTableData.historyGrid)
        }
        else if( userData.settings.mode === "LongMult")
        {     
            this.longNext()
        }
    }
    public selectedFactorNext() { // used when in level selector Mode
        if (this.index < 11) {
            this.index += 1;
            this.factor2 = this.factorsOrder[this.index];
            this.product = this.factor1 * this.factor2;
            this.productList = this.initProductList(this.product);
            [this.productGridList, this.carryList, this.rawMultList, this.carrySumList] = this.initAnswers();
            this.sumCarryList = this.initSumCarryList()
            this.numGridCorrect = 0;
            this.numCarryCorrect = 0;
            this.numSumCorrect = 0;
            this.numSumCarryCorrect = 0;
            this.resetCounter++;
        } else {
            this.index = 0;
            this.factorsOrder = this.shuffleArray(this.factorsOrder);
            this.factor2 = this.factorsOrder[this.index];
            this.product = this.factor1 * this.factor2;
            this.productList = this.initProductList(this.product);
            [this.productGridList, this.carryList, this.rawMultList, this.carrySumList] = this.initAnswers();
            this.sumCarryList = this.initSumCarryList()
            this.numGridCorrect = 0;
            this.numCarryCorrect = 0;
            this.numSumCorrect = 0;
            this.numSumCarryCorrect = 0;
            this.resetCounter++;
        }
    }
    public autoNext(historyGrid:number[][]) // this will automatically set up the next problem to be one that the user has answered the fewest times
    {
        let lowest = Number.MAX_SAFE_INTEGER
        let possibleFactors: number[][] = []
        for (let i = 0; i < historyGrid.length; i++) {
            for (let j = 0; j < historyGrid[i].length; j++) {
            const value = historyGrid[i][j];
            if (value < lowest) {
                // Found a new lowest — reset the list
                lowest = value;
                possibleFactors = [[i, j]];
            } else if (value === lowest) {
                // Found another cell with the same lowest value
                possibleFactors.push([i, j]);
            }
            }
        }
        const randomIdx = Math.floor(Math.random()*possibleFactors.length)
        this.factor1 = possibleFactors[randomIdx][0]+1;
        this.factor2 = possibleFactors[randomIdx][1]+1;
        this.product = this.factor1 * this.factor2;
        this.productList = this.initProductList(this.product);
        [this.productGridList, this.carryList, this.rawMultList, this.carrySumList] = this.initAnswers();
        this.sumCarryList = this.initSumCarryList()
        this.numGridCorrect = 0;
        this.numCarryCorrect = 0;
        this.numSumCorrect = 0;
        this.numSumCarryCorrect = 0;
        this.resetCounter++;
    }
    public longNext() // used in long multiplication. References difficulty level
    {
        let totalDigits = this.difficulty + 2;
        const f2len = Math.floor(totalDigits / 2);
        const f1len = totalDigits - f2len;
        this.factor1 = this.randomDigits(f1len);
        this.factor2 = this.randomDigits(f2len);
        this.product = this.factor1 * this.factor2;
        this.productList = this.initProductList(this.product);
        [this.productGridList, this.carryList, this.rawMultList, this.carrySumList] = this.initAnswers();
        this.sumCarryList = this.initSumCarryList()
        this.numGridCorrect = 0;
        this.numCarryCorrect = 0;
        this.numSumCorrect = 0;
        this.numSumCarryCorrect = 0;
        this.resetCounter++;

    }
    public correctGrid() {
        this.numGridCorrect += 1;
    }
    public correctCarry(){
        this.numCarryCorrect +=1;
    }
    public correctSum(){
        this.numSumCorrect +=1;
    }
    public correctSumCarry(){
        this.numSumCarryCorrect +=1;
    }
    public nextCarry(){
        if (this.carryList[this.numCarryCorrect] !== undefined)
        {
            return this.carryList[this.numCarryCorrect]
        }
        return undefined
    }
    public nextSumCarry(){
        if (this.sumCarryList[this.numSumCarryCorrect] !== undefined)
        {
            return this.sumCarryList[this.numSumCarryCorrect]
        }
        return undefined
    }
    public clone() {
        const newInstance = new Factors();
        newInstance.index = this.index;
        newInstance.factorsOrder = this.factorsOrder;
        newInstance.factor1 = this.factor1;
        newInstance.factor2 = this.factor2;
        newInstance.product = this.product;
        newInstance.productList = this.productList;
        newInstance.numGridCorrect = this.numGridCorrect;
        newInstance.numCarryCorrect = this.numCarryCorrect;
        newInstance.numSumCorrect = this.numSumCorrect;
        newInstance.numSumCarryCorrect = this.numSumCarryCorrect;
        newInstance.productGridList = this.productGridList;
        newInstance.carryList = this.carryList;
        newInstance.resetCounter = this.resetCounter;
        newInstance.difficulty = this.difficulty;
        newInstance.rawMultList = this.rawMultList;
        newInstance.carrySumList = this.carrySumList;
        newInstance.sumCarryList = this.sumCarryList;
        return newInstance;
    }

    public setLevel(factor1: number) {
        this.factor1 = factor1;
        this.index = 12;
        this.selectedFactorNext();
    }
    public setDifficulty(newdiff:number){
        this.difficulty = newdiff
        this.longNext()
    }
    public setFactors(f1:number, f2:number){
        this.factor1 = f1;
        this.factor2 = f2;
        this.product = this.factor1 * this.factor2;
        this.productList = this.initProductList(this.product);
        [this.productGridList, this.carryList, this.rawMultList, this.carrySumList] = this.initAnswers();
        this.sumCarryList = this.initSumCarryList()
        this.numGridCorrect = 0;
        this.numCarryCorrect = 0;
        this.numSumCorrect = 0;
        this.numSumCarryCorrect = 0;
        this.resetCounter++;
    }
    private shuffleArray(arr: number[]): number[] {
        const shuffled = [...arr]; // Create a copy to avoid mutating the original array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    private randomDigits(digits: number): number { // given a number of digits, will generate a number with that many
    if (digits < 1) {
    throw new Error("Number of digits must be at least 1.");
    }

    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static rowComplete(curfactors:Factors)
    {
        let productGridLength = curfactors.product.toString().length
        const endRowIndex = productGridLength * Math.ceil(curfactors.numGridCorrect / productGridLength);
        for (let index = curfactors.numGridCorrect; index < endRowIndex; index++) {
            if (curfactors.productGridList[index] !== 0) {
                return false;
            }
        }
        return true;
    }
    static leadingZero = (curfactors:Factors) =>
        {
            let productGridLength = curfactors.product.toString().length
            const endRowIndex = productGridLength * Math.ceil(curfactors.numGridCorrect / productGridLength);
            if (Factors.rowComplete(curfactors)) {
                for (let index = curfactors.numGridCorrect; index < endRowIndex; index++) {
                    curfactors.correctGrid();
                }
            }
            return curfactors;
        }
}
export default Factors;
