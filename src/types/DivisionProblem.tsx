class DivisionProblem {
    divisor:number = 1; // what we are dividing by as a number
    divisorList:number[] = []; // what we are dividing by as a list of numbers
    dividend:number = 1; //what we are dividing as a number
    dividendList:number[] = []; // what we are dividing as a list of numbers
    quotient:number = 0; //the answer as a number
    quotientList:number[] = []; // answer to the division as a list of numbers
    numQuotientCorrect:number = 0;
    remaindersList:number[][] = [] // a list of remainder subtotals represented as lists of numbers.
    resetCounter:number = 0;

    constructor ()
    {
        this.nextTable()
    }
    public nextTable() // will generate a division problem that is part of the times table
    {
        const maxVal = 12
        this.quotient = Math.ceil((Math.random() * maxVal))
        this.divisor =  Math.ceil((Math.random() * maxVal))
        this.dividend = this.divisor * this.quotient
        this.dividendList = this.dividend.toString().split('').map((x) => Number(x))
        const quotientList = this.quotient.toString().split('').map((x) => Number(x))
        this.divisorList = this.divisor.toString().split('').map((x) => Number(x))
        const numZeroes = this.dividendList.length - quotientList.length // this is the number of leading zeroes we need to add to the quotient for easier answer tracking
        this.quotientList = Array(numZeroes).fill(0).concat(quotientList)
        this.numQuotientCorrect = 0
        this.resetCounter +=1;
        this.initRemainders()

    }
    private initRemainders()
    {
        const outputList:number[][] = []
        outputList.push(this.dividendList) // the first remainder will always be the divisor
        let curRemainder = this.dividend
        for(let i = 0; i<this.quotientList.length; i++)
        {
            let place = this.quotientList.length - i - 1
            curRemainder -= (this.divisor * this.quotientList[i] * Math.pow(10, place))
            outputList.push(curRemainder.toString().split('').map((x) => Number(x)))

        }
        this.remaindersList = outputList
    }
    public clone()
    {
        const newInstance = new DivisionProblem();

        newInstance.divisor = this.divisor
        newInstance.divisorList = this.divisorList
        newInstance.dividend = this.dividend
        newInstance.dividendList = this.dividendList
        newInstance.quotient = this.quotient
        newInstance.quotientList = this.quotientList
        newInstance.numQuotientCorrect = this.numQuotientCorrect
        newInstance.remaindersList = this.remaindersList
        newInstance.resetCounter = this.resetCounter
        return newInstance
        
    }
    public correctQuotient()
    {
        this.numQuotientCorrect +=1
    }
    public nextClean() // will generate a division problem with no remainder
    {

    }

}
export default DivisionProblem