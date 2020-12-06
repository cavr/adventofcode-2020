const fs = require('fs')

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data && data.split(/\r?\n/)

            const numbers = input.map((item) => {
                return item.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1')
            }).sort()


            const max = numbers[numbers.length - 1]

            const min = numbers[0]

            console.log(parseInt(max, 2))

            console.log(numbers)

            for (let i = parseInt(min, 2); i < parseInt(max, 2); i++) {
                const bin = dec2bin(i)
                const found = numbers.find(item => item === bin)
                if (!found) {
                    console.log({bin, i})
                }
            }


            resolve(Math.max(...numbers))


        }))
    })
}


async function findNumber() {
    const result = await find()

}

findNumber()