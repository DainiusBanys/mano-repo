console.log('veikia')

const cats = ['Pilkis', 'Murka', 'Pūkis', 'Ilgauodegis', 'Pifas', 'Keris', 'Džimas', 'Džeris'];

const data = cats.map((n, i) => ({ name: n, id: i + 1 }));

// data.sort((a, b) => a.name > b.name ? 1 : -1)

console.log(data)

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);

}

const random = rand(1, 8);

const withWeight = data.map(e => {
    e.weight = rand(1, 8);
    e[e.name] = 42;
    e[`have-fun`] = true;
    return e;
})

const short = data.map(e => ({...e, weight: rand(1, 70), [e.name]: 42, [`have-fun`]: true }))

// const removed = data.filter(element => element.id != random)
// const removed = data.find(element => element.id = random)
// console.log(random)
// console.log(removed)

console.log(withWeight)

console.log(short)