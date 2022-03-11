function find(lista,key,id) {
    for (let element of lista) {
        if (element[key]==id) {
            return element;
        }
    }
    return false;
}

module.exports = find