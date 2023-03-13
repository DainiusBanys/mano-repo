const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const luck = ['good', 'bad', 'normal', 'bright', 'joyfull', 'colorfull', 'dangerous', 'interesting', 'blue', 'funny', 'fabulous', 'extraordinary'];

const randIndex = () => {
    return Math.floor(Math.random() * 12);
}

let sign = prompt("Please enter your sign");


const horoscope = () => {
    return `Your sign is ${sign}, and your day will be ${luck[randIndex()]}. Your best soulmate is ${signs[randIndex()]}`;
}

console.log(horoscope());
console.log(horoscope());
console.log(horoscope());