// 1

task1 = () => {
        const str1 = 'Arnold';
        const str2 = 'Schwarzenegger';
        let result = (str1.length < str2.length) ? str1 : str2;
        console.log(result);
    }
    //task1();

// 2

task2 = () => {
        const str1 = 'Arnold';
        const str2 = 'Schwarzenegger';
        console.log(str1.toUpperCase() + ' ' + str2.toLowerCase());
    }
    //task2();

// 3

task3 = () => {
        const str1 = 'Arnold';
        const str2 = 'Schwarzenegger';
        let str12 = str1.charAt(0).concat(str2.charAt(0))
        console.log(str12);
    }
    // task3();

// 4 

task4 = () => {
        const str1 = 'Arnold';
        const str2 = 'Schwarzenegger';
        let str12 = str1.substring(str1.length - 3, str1.length).concat(str2.substring(str2.length - 3, str2.length))
        console.log(str12);
    }
    // task4();

// 5

task5 = () => {
        const str = 'An American in Paris';
        console.log(str.replace(/a/gi, '*'));
    }
    // task5();

// 6 

task6 = () => {
        const str = 'An American in Paris';
        console.log(str.match(/a/gi).length);
    }
    // task6();

// 7

task7 = (str) => {
        // const str = 'An American in Paris'; 
        let vowels = str.match(/[aeiou]/gi)
        console.log(vowels.join(''));
    }
    // task7('An American in Paris');
    // task7('Breakfast at Tiffany\'s');
    // task7('2001: A Space Odyssey');
    // task7('It\'s a Wonderful Life');

// 8 

task8 = (str) => {
        // const str = 'Don\'t Be a Menace to South Central While Drinking Your Juice in the Hood';
        let words = str.split(' ');
        let i = 0;
        let result5 = 0;
        while (i < words.length) {
            if (words[i].length >= 5) result5++;
            i++;
        }
        console.log(result5);
    }
    // task8('Don\'t Be a Menace to South Central While Drinking Your Juice in the Hood');
    // task8('Tik nereikia gasdinti Pietų Centro, geriant sultis pas save kvartale');


// 9 

new RandExp