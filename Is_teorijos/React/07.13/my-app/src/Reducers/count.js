function count(state, action) {

    let stateCopy = state;

    switch (action.type) {

        case 'plus_one':
            stateCopy++;
            break;
        case 'minus_one':
            stateCopy--;
            break;
        case 'reset':
            stateCopy = 0;
            break;
        case 'add_some':
            action.payload = action.payload === '' ? 0 : parseInt(action.payload);
            action.payload = isNaN(action.payload) ? 0 : action.payload;
            stateCopy = stateCopy + action.payload;
            break;
        case 'rem_some':
            action.payload = action.payload === '' ? 0 : parseInt(action.payload);
            action.payload = isNaN(action.payload) ? 0 : action.payload;
            stateCopy = stateCopy - action.payload;
            break;
        default:
    }
    return stateCopy;
}

export default count;