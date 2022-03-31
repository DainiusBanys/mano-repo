let Phone = {
    name: 'iPhone13',
    capacity: '128GB',
    weight: 141,
    displaySize: 5.4,
    a15Chip: true,
    printName: function() { console.log(this.name) }
}

// prints = () => { console.log(Phone) };

const propertyNames = Object.keys(Phone);



prints = () => {
    let text = '';
    for (let i in Phone) {
        {
            console.log('|---------------------|')
            text = Phone[i];
            console.log('| ' + i + ' ' + text + '       |');
            // console.log(propertyNames[1]);
        }
    }


};

prints();