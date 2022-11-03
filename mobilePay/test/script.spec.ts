import { parse, calculation, out, merchantDiscount } from '../src/script'

describe("test suite for mobilePay transaction fees calculation", () => {
  beforeEach(() => {
    parse.parsed = [];
    merchantDiscount.CIRCLE_K.transactionQty = 0 ;
    merchantDiscount.TELIA.transactionQty = 0 ;
    merchantDiscount["7-ELEVEN"].transactionQty = 0 ;
  });
  test("parse correct inputs", () => {
    // setup
    const expectedParsed = [
      { transDate: "2018-09-01", transMerchant: "7-ELEVEN", transAmount: 50, transFee: 0, isWeekend: true },
      { transDate: "2018-05-01", transMerchant: "TELIA", transAmount: 100, transFee: 0, isWeekend: false },
      { transDate: "2018-10-14", transMerchant: "CIRCLE_K", transAmount: 307, transFee: 0, isWeekend: true },
    ];
    // excercise
    const input = [
      "2018-09-01 7-ELEVEN 50",
      "2018-05-01 TELIA 100",
      "2018-10-14 CIRCLE_K 307",
    ];
    const resultParsed = parse.parsing(input)
    // verify
    expect(resultParsed).toEqual(expectedParsed);
  });
  test("parse 3 faulty inputs of four ", () => {
    // setup
    const expectedFaultyParsed = [
      { transDate: "2018-09-01", transMerchant: "7-ELEVEN", transAmount: 50, transFee: 0, isWeekend: true },
    ];
    // excercise
    const faultyInput = [
      "2018-09-01 7-ELEVEN 50",
      "2018-05-01 TELIA 100 50",
      "20181014 CIRCLE_K 307",
      "2018-10-14 CIRCLE_K fifty",
    ];
    const resultFaultyParsed = parse.parsing(faultyInput);
    // verify
    expect(resultFaultyParsed).toEqual(expectedFaultyParsed);
  });
  test("calculate fees", () => {
    // setup
    const expectedFee = [
      { transFee: 0.00 },
      { transFee: 0.50 },
      { transFee: 0.45 },
      { transFee: 2.46 },
      { transFee: 2.46 },
      { transFee: 2.46 },
      { transFee: 2.46 },
      { transFee: 2.46 },
      { transFee: 2.46 },
      { transFee: 2.46 },
      { transFee: 2.46 },
      { transFee: 0.40 },
      { transFee: 0.32 },
    ];
    // excercise
    const resultFee = [
      {
        transDate: "2018-09-01",
        transMerchant: "7-ELEVEN",
        transAmount: 50,
        transFee: 0,
        isWeekend: true,
      },
      {
        transDate: "2018-11-03",
        transMerchant: "7-ELEVEN",
        transAmount: 50,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2022-11-03",
        transMerchant: "TELIA",
        transAmount: 50,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 50,
        transFee: 0,
        isWeekend: false,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 50,
        transFee: 0,
        isWeekend: false,
      },
    ];
    // verify
    expect(calculation.applyRules(resultFee)).toMatchObject(expectedFee);
  });
  test("output", () => {
    // setup
    const expectedOutput = [
      "2018-09-01 7-ELEVEN 0.00",
      "2018-09-04 CIRCLE_K 2.46",
      "2022-10-31 TELIA 2.76",
    ];
    // excercise
    const resultOutput = out.makeOutput([
      {
        transDate: "2018-09-01",
        transMerchant: "7-ELEVEN",
        transAmount: 50,
        transFee: 0,
        isWeekend: true,
      },
      {
        transDate: "2018-09-04",
        transMerchant: "CIRCLE_K",
        transAmount: 307,
        transFee: 2.46,
        isWeekend: false,
      },
      {
        transDate: "2022-10-31",
        transMerchant: "TELIA",
        transAmount: 307,
        transFee: 2.76,
        isWeekend: false,
      },
    ]);
    // verify
    expect(resultOutput).toEqual(expectedOutput);
  });

  test("end2end", () => {
    // setup
    const expectedEndOutput = [
        "2018-09-01 7-ELEVEN 0.00",
        "2018-09-04 CIRCLE_K 2.46",
        "2022-10-31 TELIA 4.53",
    ];
    // excercise
    const endInput = [
        "2018-09-01 7-ELEVEN 100",
        "2018-09-04 CIRCLE_K 307",
        "2022-10-31 TELIA 503",
    ];
    const resultEndOutput = out.makeOutput(calculation.applyRules(parse.parsing(endInput)));
    // verify 
    expect(resultEndOutput).toEqual(expectedEndOutput);
  });
});
