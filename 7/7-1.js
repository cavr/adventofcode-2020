const fs = require('fs')


const KEY = 'shiny gold'


const findBags = ({input, keysCanContain}) => {
    const inputKeys = Array.from(keysCanContain).reduce((accum, item)=>{
        return input[item] ? [...accum, input[item]] :  [...accum]
    },[]).flat()

    return inputKeys.reduce((accum, item)=>{
        const {number, text} = item

        return accum + number + number * findBags({input: input, keysCanContain: [text] })
    },0)
}

const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data && data.split(/\r?\n/).reduce((accum, item) => {
                const arrContainer = item.split('contain')
                const key = arrContainer[0].trim()
                const values = arrContainer[1].split(',').map(item => item.trim().replace('.', ''))

                const valuesWitCounts = values.map(item => {
                    const number = item.substr(0, 2).trim()

                    const text = item.substr(2).split( ' ')
                    text.pop()

                    return {
                        text: text.join(' ').trim(),
                        number: number === 'no' ? 0 : parseInt(number, 10)
                    }
                })

                const keyText = key.split( ' ')
                keyText.pop()

                return  {...accum, [keyText.join(' ').trim()]: valuesWitCounts}
            }, {})

            resolve(findBags({input, keysCanContain: [KEY]}))


        }))
    })
}


async function findNumber() {
    const result = await find()

    console.log(result)
}

findNumber()