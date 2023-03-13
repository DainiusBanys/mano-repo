console.log("hello!");
const sign = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const luck = ['good', 'bad', 'normal', 'bright', 'joyfull', 'colorfull', 'dangerous', 'interesting', 'blue', 'funny', 'fabulous', 'extraordinary'];

const randIndex = () => {
    return Math.floor(1 + Math.random() * 12);
}

console.log(randIndex());

const horoscope = (sign) => {
    return `Your sign is ${sign}, and your day will be ${luck[randIndex()]}. Your best soulmate is ${sign[randIndex()]}`;
}