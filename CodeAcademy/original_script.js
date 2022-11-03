const input = ['2018-09-01 7-ELEVEN 50', '2018-09-04 CIRCLE_K 307', '2018-09-04 CIRCLE_K 503'];
// const input = '2018-09-01 7-ELEVEN 50';

const output = [];

const merchantDiscount = {
    'CIRCLE_K': { discount: 0.2, transactionQty: 0 },
    'TELIA': { discount: 0.1, transactionQty: 0 },
    '7-ELEVEN': { discount: 0, transactionQty: 0 }
}

// Parsing

class Transaction {
    constructor([transDate, transMerchant, transAmount]) {
        this.transDate = transDate;
        this.transMerchant = transMerchant;
        this.transAmount = parseInt(transAmount);
        this.transFee = null;
        this.isWeekend = this.weekend();
    }


    // .toLocaleDateString('en-CA')

    weekend() {
        return (new Date(this.transDate).getDay() === 6) || (new Date(this.transDate).getDay() === 0);
    }




}

let parsed = [];

parsing = (input) => {

    parsed = input.map(el => el.split(' ')).map((tr, i) => {
        return new Transaction(tr);
    });
}


parsing(input);




// Calculation

const calculation = {

    rounding: (fee) => {
        return +(parseFloat(fee).toFixed(2));
    },

    transactionCount: (tr) => {
        return merchantDiscount[tr.transMerchant].transactionQty++;
    },

    onePercentRule: (tr) => {
        return tr.transFee = calculation.rounding(tr.transAmount * 0.01);
    },

    merchantDiscountRule: (tr) => {
        return (tr.transFee = calculation.rounding(tr.transFee - (tr.transFee * merchantDiscount[tr.transMerchant].discount)));
    },

    tenTransactionsRule: (tr) => {
        return (merchantDiscount[tr.transMerchant].transactionQty >= 10) ? tr.transFee = calculation.rounding(tr.transFee - (tr.transFee * 0.2)) : calculation.rounding(tr.transFee);
    },

    weekendRule: (tr) => {
        return (tr.isWeekend) ? tr.transFee = 0 : calculation.rounding(tr.transFee);
    },

    applyRules: (tr) => {
        tr.map(tr => {
            calculation.transactionCount(tr);
            calculation.onePercentRule(tr);
            calculation.merchantDiscountRule(tr);
            calculation.tenTransactionsRule(tr);
            calculation.weekendRule(tr);
            // return calculation.rounding(tr);
        })
    }

}

calculation.applyRules(parsed);
console.log(parsed);
console.log(merchantDiscount);

// Output

const out = {

    makeOutput: (tr) => {

        return tr.map(t => output.push(t.transDate + ' ' + t.transMerchant + ' ' + t.transFee));

    }
}

out.makeOutput(parsed);

console.log(output);