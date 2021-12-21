export function isEmpty (string) {
  return string === ''
}

export function sortByOrder (array, key, order) {
    let sortedArray = array.sort(function (a, b) {
        return order === 0 ? a[key] - b[key] : b[key] - a[key];
    });
    return sortedArray;
}

export function sortByOrderObject (object, key, order) {
  let sortedArray = Object.keys(object)
        ?.sort(function (a, b) {
            return order === 0 ? object[a][key] - object[b][key] : object[b][key] - object[a][key]
        })
  return sortedArray;
}

export function sortByAlphOrder (array) {
    let sortedArray = array.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        return 0;
    });
    return sortedArray;
}

export function setItemToLocal(key, data) {
    localStorage.setItem(key, data)
}

export function getItemFromLocal(key) {
    return localStorage.getItem(key)
}
