const fs = require('fs')

const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data && data.split(/\r?\n/).map(item => {
                const operation = item.split(' ')[0];
                const sign = item.split(' ')[1].substr(0, 1)
                const number = parseInt(item.split(' ')[1].substr(1), 10)

                return {
                    operation,
                    sign,
                    number
                }
            })

            let sum = 0
            const visited = {}

            let i = 0

            while (!visited[i]) {
                visited[i] = true
                const {operation, number, sign} = input[i]

                if (operation === 'nop') {
                    i = i + 1
                } else if (operation === 'acc') {
                    if (sign === '+') {
                        sum = sum + number
                    } else {
                        sum = sum - number
                    }
                    i = i + 1
                }
                else if (operation === 'jmp') {
                    if (sign === '+') {
                        i = i + number
                    } else {
                        i = i - number
                    }
                }

                console.log({i, visited})
            }

            console.log(sum)

        }))
    })
}


async function findNumber() {
    const result = await find()

    console.log(result)
}

findNumber()