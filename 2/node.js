const fs = require('fs')

const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data.split(/\r?\n/)

            const result = input.reduce((accum, entry) => {
                const numberRegx = (/\d+/)

                const entryArr = entry.split(':')

                const rules = entryArr[0]
                const password = entryArr[1]

                const ruleSplit = rules.split('-')

                const firstNumber = Number(ruleSplit[0].match(numberRegx)[0])
                const secondNumber = Number(ruleSplit[1].match(numberRegx)[0])
                const word = ruleSplit[1].split(' ')[1]

                console.log({firstNumber, secondNumber, word})

                const count = password.split('').reduce((accum, char) => {
                    return char === word ? accum + 1 : accum
                }, 0)

                const isValid = (count > firstNumber && count < secondNumber) || (count === firstNumber || count === secondNumber)

                const passwordArr = {password, word, firstNumber, secondNumber}

                return isValid ? [...accum, passwordArr] : [...accum]

            }, [])

            resolve(result)

        }))
    })
}


async function findNumber() {

    const result = await find();

    console.log(result.length)


}

findNumber()