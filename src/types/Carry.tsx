type Carry = {
    value: number; // the value of the carry
    place: number; // the column the carry will occupy (1s, 10s etc)
    order: number; // the matching idex in the answerList for this answer
    primary:boolean; // if a carry is a primary carry, then it was achieved without adding an existing carry.
    /*

    12
    X9


    1  <---- primary carry because it came naturally from the 2x9
    12
    x9
     8

    1
   +9
   10  <---- the 1 here is a secondary carry because it had to be created from adding the 9 to the existing 1 carry. 
    12
    x9

    */
};
export default Carry;
