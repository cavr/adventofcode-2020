const fs = require('fs')

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data && data.split(/\r?\n/).map(item => item ? item : '/').join('').split('/').map(item => Array.from(new Set(item.split(''))).join(''))


            const counts = input.map(item => item.length)
            const sum = counts.reduce((accum, item) => accum + item, 0)

            resolve(sum)
        }))
    })
}


async function findNumber() {
    const result = await find()
    console.log(result)
}

findNumber()