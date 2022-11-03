"use strict";
exports.__esModule = true;
exports.out = exports.calculation = exports.parse = exports.merchantDiscount = void 0;
var input = [
    "2018-09-01 7-ELEVEN 50",
    "2018-09-04 CIRCLE_K 307307",
    "2018-09-04 TELIA 503",
];
var output = [];
exports.merchantDiscount = {
    CIRCLE_K: { discount: 0.2, transactionQty: 0 },
    TELIA: { discount: 0.1, transactionQty: 0 },
    "7-ELEVEN": { discount: 0, transactionQty: 0 }
};
var Transaction = /** @class */ (function () {
    function Transaction(_a) {
        var transDate = _a[0], transMerchant = _a[1], transAmount = _a[2];
        this.transDate = transDate;
        this.transMerchant = transMerchant;
        this.transAmount = parseInt(transAmount);
        this.transFee = 0;
        this.isWeekend = this.weekend();
    }
    Transaction.prototype.weekend = function () {
        return (new Date(this.transDate).getDay() === 6 ||
            new Date(this.transDate).getDay() === 0);
    };
    return Transaction;
}());
exports.parse = {
    parsed: [],
    isValid: function (checked) {
        return ((checked.length === 3) &&
            (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(checked[0])) &&
            (/^(?!0\d)\d*(\.\d+)?$/.test(checked[2])));
    },
    parsing: function (parseInput) {
        exports.parse.parsed = parseInput
            .map(function (el) { return el.split(" "); })
            .filter(function (spl) { return exports.parse.isValid(spl); })
            .map(function (tr) {
            return new Transaction(tr);
        });
        return exports.parse.parsed;
    }
};
// Calculation
exports.calculation = {
    calculated: [],
    rounding: function (fee) {
        return +parseFloat(String(fee)).toFixed(2);
    },
    transactionCount: function (tr) {
        return exports.merchantDiscount[tr.transMerchant].transactionQty++;
    },
    onePercentRule: function (tr) {
        return (tr.transFee = exports.calculation.rounding(tr.transAmount * 0.01));
    },
    merchantDiscountRule: function (tr) {
        return (tr.transFee = exports.calculation.rounding(tr.transFee - tr.transFee * exports.merchantDiscount[tr.transMerchant].discount));
    },
    tenTransactionsRule: function (tr) {
        return exports.merchantDiscount[tr.transMerchant].transactionQty >= 10
            ? (tr.transFee = exports.calculation.rounding(tr.transFee - tr.transFee * 0.2))
            : exports.calculation.rounding(tr.transFee);
    },
    weekendRule: function (tr) {
        return tr.isWeekend ? (tr.transFee = 0) : exports.calculation.rounding(tr.transFee);
    },
    applyRules: function (obj) {
        obj.map(function (obj) {
            exports.calculation.transactionCount(obj);
            exports.calculation.onePercentRule(obj);
            exports.calculation.merchantDiscountRule(obj);
            exports.calculation.tenTransactionsRule(obj);
            exports.calculation.weekendRule(obj);
        });
        return obj;
    }
};
// Output
exports.out = {
    makeOutput: function (tr) {
        output = [];
        tr.map(function (t) {
            return output.push(t.transDate + " " + t.transMerchant + " " + t.transFee.toFixed(2));
        });
        return output;
    }
};
// output for input test
console.log(exports.out.makeOutput(exports.calculation.applyRules(exports.parse.parsing(input))));
