const fs = require('fs')

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data && data.split(/\r?\n/).map(item => item ? Array.from(new Set(item)).join('') : '/')

            input.push('/')
            console.log(input)

            const counts = []

            let to = 0
            let i = 0
            while (i <= input.length) {
                let value = ''
                let values = {}

                to = input.indexOf('/')

                input[to] = 'DONE'

                let howMany = to - i

                console.log({i, to, value, values})

                for (; i < to; i++) {
                    value = input[i]


                    value.split('').forEach(value => {
                        if (values[value]) {
                            values[value] = values[value] + 1
                        } else {
                            values[value] = 1
                        }
                    })

                }

                const count = Object.entries(values).reduce((accum, [key, value])=>{
                    return howMany === value ? accum + 1 : accum
                }, 0)

                counts.push(count)



                i = i + 1
            }

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