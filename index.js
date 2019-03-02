
function flatten(array) {
    return array.reduce((flat, arrayFlatten) => {
        return flat.concat(Array.isArray(arrayFlatten) ? flatten(arrayFlatten) : arrayFlatten);
    }, []);
}

function converToArray(json, tree = null) {
    return Object.keys(json).map((key) => {
        if (typeof json[key] === 'object') {

            const mountTree = tree ? `${tree}.${key}` : key
            return converToArray(json[key], mountTree)
        } else {
            if (tree) {
                return {
                    [`${tree}.${key}`]: json[key]
                }
            }
            return {
                [key]: json[key]
            }

        }
    })
}

function generateCSV(array) {

    let arraySplited = "";

    array.forEach((line) => {
        const key = Object.keys(line)[0]

        arraySplited += `${key};${line[key]}\r`
    })

    return arraySplited

}

function toCSV(json) {

    const arrayFormatted = converToArray(json)

    const flatArray = flatten(arrayFormatted)

    const csv = generateCSV(flatArray)

    return csv.toString()
}

module.exports = { toCSV }

