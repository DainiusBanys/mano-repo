let string;

function fizzAndBazz(string) {
    if (string === 'fizz') { console.log('buzz') } else if (string === 'buzz') {
        console.log('fizz')
    } else { console.log('Please provide fizz or bazz') };

    fizzAndBazz('fizz');