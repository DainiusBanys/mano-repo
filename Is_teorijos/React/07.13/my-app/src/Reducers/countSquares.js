function countSquares(state, action) {
    let stateCopy = [...state];
    switch (action.type) {
        case 'plus_square':
            action.payload = action.payload === '' ? stateCopy.length : parseInt(action.payload);
            action.payload = isNaN(action.payload) ? stateCopy.length : action.payload;

            stateCopy.push({ number: action.payload, show: true });
            console.log(stateCopy);
            break;
        case 'minus_square':
            stateCopy.shift();
            console.log(stateCopy);
            break;
        case 'reset_square':
            stateCopy = [];
            console.log(stateCopy);
            break;
        case 'sort_asc':
            stateCopy.sort(function(a, b) { return a.number - b.number });
            console.log(stateCopy);
            break;
        case 'sort_desc':
            stateCopy.sort(function(a, b) { return b.number - a.number });
            console.log(stateCopy);
            break;
        case 'show_even':
            stateCopy = stateCopy.map(x => (x.number % 2) ? {...x, show: true } : {...x, show: false });
            console.log(stateCopy);
            break;
        case 'show_odd':
            stateCopy = stateCopy.map(x => (x.number % 2) ? {...x, show: false } : {...x, show: true });
            console.log(stateCopy);
            break;
        case 'show_all':
            stateCopy = stateCopy.map(x => ({...x, show: true }));
            console.log(stateCopy);
            break;
        default:
    }
    return stateCopy;
}

export default countSquares;