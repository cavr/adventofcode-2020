const fs = require('fs')


const KEY = 'shiny gold'


const findBags = ({input, keysCanContain}) => {
    if (keysCanContain.size === 0) {
        return 0
    }


    const filteredInput = Object.entries(input).reduce((accum, [key, value])=>{
        const contains = Array.from(keysCanContain).some(item => key.startsWith(item))

        return contains ? {...accum} : {...accum, [key]: value}
    },{})

    const newKeyContent = new Set()

    const rootCount = Object.entries(filteredInput).reduce((accum, [key, value]) => {
        const contains = value.some(val => {
            return Array.from(keysCanContain).some(keyCan => val.text.startsWith(keyCan))
        })

        const textWithoutBag = key.split(' ')
        textWithoutBag.pop()

        contains && newKeyContent.add(textWithoutBag.join(' ').trim())

        return contains ? accum + 1 : accum
    }, 0)

    return rootCount + findBags({input: filteredInput, keysCanContain: newKeyContent})
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
                        number
                    }
                })

                return  {...accum, [key]: valuesWitCounts}
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