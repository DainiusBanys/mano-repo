// 1

time = () => {
        const d = new Date();
        let time = d.toLocaleTimeString();
        console.log(time);
    }
    // time();

// 2

let pattern = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;
dateCheck = (dateVal) => {
        var dateValue = dateVal.match(pattern);
        (dateValue === null) ? console.log('Pateikta data neteisingai suformatuota ' + dateVal): console.log('Data gera ' + dateVal);
    }
    // dateCheck('1974-05-29');
    // dateCheck('2020/12/31');
    // dateCheck('2020-12-31');

// 3

timeForMilkAndCookies = (dateVal) => {
        const date = new Date(dateVal);
        let day = date.getDate();
        let month = date.getMonth();
        console.log(dateVal);
        let cookieTime = (month === 11) && (day === 25);
        console.log(cookieTime);

    }
    // timeForMilkAndCookies('1999-12-25');
    // timeForMilkAndCookies('2021-07-14');

// 4

days = (year, month) => {
        const date = new Date();
        date.setFullYear(year, month, 0);
        let days = date.getDate();
        console.log(year + ' ' + month + ' = ' + days);

    }
    // days(2022, 12);
    // days(2022, 2);
    // days(2022, 4);

// 5

showMonth = (date) => {
        const checkDate = new Date(date);
        console.log(date, checkDate.toLocaleString("lt-LT", { month: "long" }));
    }
    // showMonth('1974-05-29');
    // showMonth('1969-07-07');
    // showMonth('2022-04-08');

// 6

addMinutes = (object, min) => {

        console.log(new Date(object.getTime() + min * 60000).toGMTString());
    }
    // addMinutes(new Date('Wed, 23 Jan 2019 09: 23: 42 GMT'), 10);

// 7

weekend = () => {
        const d = new Date();
        let weekday = d.getDay();
        (weekday === 7) || (weekday === 6) ? console.log('Siandien yra savaitgalis :)'): console.log('Siandien ne savaitgalis :(');
    }
    // weekend();

// 8

dayDiff = (date1, date2) => {
    let dateObj1 = new Date(date1);
    let dateObj2 = new Date(date2);
    let differenceMs = (dateObj2.getTime() - dateObj1.getTime());
    let differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    console.log(differenceDays);
}

// dayDiff('2022-04-07', '2023-04-08');
// dayDiff('2022-04-07', '2022-04-08');

// 9 

biggerDate = (date1, date2) => {
        let dateObj1 = new Date(date1);
        let dateObj2 = new Date(date2);
        (dateObj1 > dateObj2) ? console.log(date1): console.log(date2);
    }
    // biggerDate('2022-04-07', '1974-04-08');
    // biggerDate('1992-04-07', '2022-04-07');
    // biggerDate('1122-04-07', '2322-04-07');
    // biggerDate('3222-04-07', '1022-04-07');

// clock
const showTime = () => {

    const d = new Date();
    let time = d.toLocaleTimeString();
    const clockElement = document.getElementById("clock-container");
    clockElement.innerHTML = time;
};

setInterval(showTime, 1000);