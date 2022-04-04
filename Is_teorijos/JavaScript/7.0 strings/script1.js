// 1

raskZodi = (zodis) => {
        let str = zodis.match(/[a-z]/g);

        console.log(str.join(''));

    }
    // raskZodi('UcUNFYGaFYFYGtNUH');
    // raskZodi("ERFSFGpSFGSDFGaSDFGsSDFGlSERTaBBXpWEtFSAiADCXsXVB");
    // raskZodi("OIPjQEQDDaQDSCADvASFDCaCCHJKGHJsYTRRcWQrASDFiADFQpQRWĮWtTWEYETR");

// 2

raskNemo = (sakinys) => {
    let str = sakinys.split(' ');
    let orderNumber = (str.indexOf('Nemo')) + 1
    if (orderNumber === 0) {
        console.log('Negaliu rasti Nemo :(');
        return;
    }
    console.log('Radau Nemo ' + orderNumber + ' žodyje!');
}

// raskNemo("I am finding Nemo !");
// raskNemo("Nemo is me");
// raskNemo("I am Notnemo");

// 3

countVowels = (word) => {
    let vowels = word.match(/[aeiouy]/gi);

    console.log(vowels.length);
}

// countVowels("Celebration");
// countVowels("Palm")
// countVowels("Prediction")

// 4

trinkBalses = (sentence) => {
        let sentenceCut = sentence.replace(/[aeiouy]/gi, '');
        console.log(sentenceCut);
    }
    // trinkBalses('I have never seen a thin person drinking Diet Coke.');

// 5

// 1 dalis

bomb = (bombSentence) => {
    bombSentence = bombSentence.replace(/[.!?]/g, ' ');
    let str = bombSentence.split(' ');
    let i = 0;
    let y = -1;
    while (i < str.length) {

        if (str[i].toLowerCase() === 'bomb') {
            console.log('Duck!!! //  ' + (i + 1));
            y++;
            return y;
        }
        i++;
        return y;
    };
    if (y == -1) { console.log('There is no bomb, relax. // ' + y) }
};

// bomb("There is a bomb.");
// bomb("There is a BomB!!!");
// bomb("This goes boom!!!");

// 2 dalis


// function myDisplayer(some) {
//     document.getElementById("demo").innerHTML = some;
//   }

//   function myCalculator(num1, num2, myCallback) {
//     let sum = num1 + num2;
//     myCallback(sum);
//   }

//   myCalculator(5, 5, myDisplayer);


// deminer = (bombSentence, check) => {

// }


bomb = (bombSentence) => {
    bombSentence = bombSentence.replace(/[.!?]/g, ' ');
    let str = bombSentence.split(' ');
    let i = 0;
    let y = -1;
    while (i < str.length) {

        if (str[i].toLowerCase() === 'bomb') {
            y++;
            return y;
        }
        i++;
    };
    if (y == -1) { return y; }
};



function deminer(bombSentence, bomb) {
    if (bomb(bombSentence) !== -1) { console.log(bombSentence.replace(/bomb/gi, 'puf')) } else console.log(bombSentence);
};

// deminer("Hey, did you think there is a bomb?", bomb);
// deminer("Hey, did you think there is a bombike?", bomb);

// 6

capitalize = (word) => {
        const str = word.charAt(0).toUpperCase() + word.slice(1);
        console.log(str);
    }
    // capitalize('dainius');

// 7

checkTitle = (sentence) => {
    let splitSentence = sentence.split(' ');
    let i;
    let result = 0;
    for (i = 0; i < splitSentence.length; i++) {
        if (splitSentence[i].charAt(0).match(/[A-Z]/) === null) { result++ };
    }
    console.log(result === 0);
}

checkTitle('A Mind Boggling Achievement');
checkTitle("Water is Transparent");