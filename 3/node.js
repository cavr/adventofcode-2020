const fs = require('fs')


const findTree = ({input, right, down}) =>{
    let x = 0
    let y = 0

    let trees = 0

    //right 3, down 1:


    x = x + right
    y = y + down

    while (y < input.length) {
        const maxX = input[0].length

        if(x >= maxX){
            x =  x % maxX
        }

        const treeOrOpen = input[y][x]


        if(treeOrOpen === '#'){
            trees = trees + 1
        }

        x = x + right
        y = y + down


    }

    return trees
}

const find = ({right, down}) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data.split(/\r?\n/).map(item => item.split(''))

            console.log(input)

            const trees = findTree({input, right, down})
            resolve(trees)
        }))
    })
}


async function findNumber() {
    const result1  = await find({right:1, down:1})
    const result2  = await find({right:3, down:1})
    const result3  = await find({right:5, down:1})
    const result4  = await find({right:7, down:1})
    const result5  = await find({right:1, down:2})

    console.log({result1, result2, result3, result4, result5})

    console.log(result1 * result2 * result3 * result4 * result5)
}

findNumber()