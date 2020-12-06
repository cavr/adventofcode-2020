const fs = require('fs')


const numbersNeeded = ({input, numberToSum}) => {
    const previouseNumbers = {}

    const result = input.reduce((accum, number) => {
        const numberNeeded = numberToSum - number;

        if (previouseNumbers[numberNeeded]) {
           return [number, numberNeeded]
        }

        previouseNumbers[number] = number

        return accum
    }, []);
    return result.length ?
       result: null
}


const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data.split(/\r?\n/).map(number => parseInt(number, 10))

            const numberToSum = 2020

            const previouseNumbers = {}

            const result = input.reduce((accum, number) => {
                const newNumberToBeFound = numberToSum - number;

                const numbersFound = numbersNeeded({input: Object.values(previouseNumbers),
                numberToSum: newNumberToBeFound})

                if (numbersFound) {
                    console.log([number, ...numbersFound])
                    return [number, ...numbersFound]
                }

                previouseNumbers[number] = number

                return accum
            }, []);
            result.length ?
                resolve(result.reduce((accum, number)=> accum*number), 1) : reject('Number not found')
        }))
    })
}


async function findNumber() {
    try {
        const numberToBeFound = await find();
        console.log(numberToBeFound)
    } catch (e) {
        console.error(e)
    }
}

findNumber()