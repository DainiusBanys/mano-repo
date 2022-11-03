const input = [
  "2018-09-01 7-ELEVEN 50",
  "2018-09-04 CIRCLE_K 307307",
  "2018-09-04 TELIA 503",
];

let output: string[] = [];

interface MerchantProps {
  discount: number,
  transactionQty: number
}

interface MerchantDiscount {
  CIRCLE_K : MerchantProps,
  TELIA: MerchantProps,
  "7-ELEVEN": MerchantProps,
  reset() : MerchantDiscount
}

export let merchantDiscount = {
  CIRCLE_K: { discount: 0.2, transactionQty: 0 },
  TELIA: { discount: 0.1, transactionQty: 0 },
  "7-ELEVEN": { discount: 0, transactionQty: 0 },

}

// Parsing

 interface Transaction {
  transDate: string;
  transMerchant: string;
  transAmount: number;
  transFee: number;
  isWeekend: boolean;
}

 class Transaction {
  constructor([transDate, transMerchant, transAmount]: string[]) {
    this.transDate = transDate;
    this.transMerchant = transMerchant;
    this.transAmount = parseInt(transAmount);
    this.transFee = 0;
    this.isWeekend = this.weekend();
  }

  weekend() {
    return (
      new Date(this.transDate).getDay() === 6 ||
      new Date(this.transDate).getDay() === 0
    );
  }
}

 interface parsedData {
  transDate: string;
  transMerchant: string;
  transAmount: number;
  transFee: number;
  isWeekend: boolean;
}


export const parse = {
    parsed: [] as parsedData[],
    isValid: (checked: string[]) => {
        return ((checked.length === 3) && 
    (  /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(checked[0])) &&
    (/^(?!0\d)\d*(\.\d+)?$/.test(checked[2]))); 
    },    
    parsing: (parseInput: string[]) => {
         parse.parsed = parseInput
        .map(el => el.split(" "))
        .filter(spl =>   parse.isValid(spl))
        .map((tr) => {
          return new Transaction(tr);
        });
        return parse.parsed;
    }
}

// Calculation

export const calculation = {
    calculated: [] as parsedData[] ,
  rounding: (fee: number) => {
    return +parseFloat(String(fee)).toFixed(2);
  },

  transactionCount: (tr: parsedData) => {
    return merchantDiscount[tr.transMerchant as keyof typeof merchantDiscount].transactionQty++ ;
  },

  onePercentRule: (tr: parsedData) => {
    return (tr.transFee = calculation.rounding(tr.transAmount * 0.01));
  },

  merchantDiscountRule: (tr: parsedData) => {
    return (tr.transFee = calculation.rounding(
      tr.transFee - tr.transFee * merchantDiscount[tr.transMerchant as keyof typeof merchantDiscount].discount
    ));
  },

  tenTransactionsRule: (tr: parsedData) => {
    return merchantDiscount[tr.transMerchant as keyof typeof merchantDiscount].transactionQty >= 10
      ? (tr.transFee = calculation.rounding(tr.transFee - tr.transFee * 0.2))
      : calculation.rounding(tr.transFee);
  },

  weekendRule: (tr: parsedData) => {
    return tr.isWeekend ? (tr.transFee = 0) : calculation.rounding(tr.transFee);
  },

  applyRules: (obj: parsedData[])  => {
      obj.map((obj) => {
        calculation.transactionCount(obj);
        calculation.onePercentRule(obj);
        calculation.merchantDiscountRule(obj);
        calculation.tenTransactionsRule(obj);
        calculation.weekendRule(obj);
    });
    return obj;
  },
};

// Output

export const out = {
  makeOutput: (tr: parsedData[]) => {
    output = [];
    tr.map((t) =>
      output.push(t.transDate + " " + t.transMerchant + " " + t.transFee.toFixed(2))
    );
    return output;
  },
};

// output for input test
 console.log(out.makeOutput(calculation.applyRules(parse.parsing(input))));
