function getID(key) {

    let id = localStorage.getItem(key + '_id');
    if (id === null) {
        localStorage.setItem(key + '_id', 1);
        return 1;
    }
    id = parseInt(id);
    id++;
    localStorage.setItem(key + '_id', id);
    return id;
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data === null) {
        localStorage.setItem(key + '_id', JSON.stringify([]));
        return [];
    }
    return JSON.parse(data);
}

export function create(key, data) {

    const data = getFromLocalStorage(key);
    const newData = {...data, id: getID(key) };
    data.push(newData);
    localStorage.setItem(key + '_id', JSON.stringify(data));
}

export function destroy(key, id) {
    const data = getFromLocalStorage(key);
    localStorage.setItem(key + '_id', JSON.stringify(
        data.filter(d => d.id != id)));
}

export function update(key, newData, id) {
    const data = getFromLocalStorage(key);
    localStorage.setItem(key + '_id', JSON.stringify(
        data.map(d => d.id === id ? {...newData, id: id } : {...d })));
}

export function read(key) {
    return getFromLocalStorage(key);
}