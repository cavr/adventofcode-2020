const fs = require('fs')

const values = {
    byr: (value) => value.length === 4 && ((Number(value) > 1920 && Number(value) < 2002) || (Number(value) === 1920 || Number(value) === 2002)),
    iyr: (value) => value.length === 4 && ((Number(value) > 2010 && Number(value) < 2020) || (Number(value) === 2010 || Number(value) === 2020)),
    eyr: (value) => value.length === 4 && ((Number(value) > 2020 && Number(value) < 2030) || (Number(value) === 2020 || Number(value) === 2030)),
    hgt: (value) => {
        try {
            const cmOrIn = value.split('').slice(-2).join('')
            if (!['cm', 'in'].includes(cmOrIn)) {
                return false
            }

            const indexCM = value.indexOf('c')

            const indexIn = value.indexOf('i')

            const index = indexCM > 0 ? indexCM : indexIn

            const number = Number(value.substr(0, index ))

            if (!Number.isInteger(number)) {
                return false
            }

            if (cmOrIn === 'cm') {
                return (number > 150 && number < 193) || (number === 150 || number === 193)
            }

            if (cmOrIn === 'in') {
                return (number > 59 && number < 76) || (number === 59 || number === 76)
            }
        } catch (e) {
            return false
        }
    },
    hcl: (value) => {
        return /^#[0-9A-F]{6}$/i.test(value)
    },
    ecl: (value) => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    },
    pid: (value) => {
        return Number.isInteger(Number(value)) && value.length === 9
    }
}

const find = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./input', 'utf8', ((err, data) => {
            const input = data && data.split(/\r?\n/).map(item => item || '/').reduce((accum, item) => {
                return `${accum} ${item}`
            }, '').split('/')


            const passports = input.map(item => {
                const keyValues = item.split(' ')

                return keyValues.reduce((accum, keyValue) => {
                    const [key, value] = keyValue.split(':')
                    return key ? {...accum, [key]: value} : {...accum}
                }, {})
            })

            const count = passports.reduce((accum, passport) => {
                const isValid = Object.entries(values).every(([key, func])=>
                {
                    const value = passport[key]
                    console.log({passport, value, isValid: value && func(value)})
                    return value && func(value)
                }
            )

                return isValid ? accum + 1 : accum
            }, 0)

            resolve(count)

        }))
    })
}


async function findNumber() {
    const result = await find()

    console.log(result)
}

findNumber()