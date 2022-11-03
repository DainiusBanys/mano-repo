const n = 24;

if ((n % 2 !== 0) || ((n % 2 == 0) && (n >= 6) && (n <= 20))) console.log('Weird');
else if ((n % 2 == 0) && ((2 <= n <= 5) || (n > 20))) console.log('Not Weird');