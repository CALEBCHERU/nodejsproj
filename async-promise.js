// the most professional way to write an asyn and promise

const { readFile,writeFile} = require('fs').promises

const start2 = async () => {
    try {
        const first = await readFile("./content/first.txt",'utf-8')
        const second = await writeFile("./content/second.txt",'utf-8')
        await writeFile(
            "./content/result-mind-grenade.txt",
            `THIS IS NiCE : ${first} ${second} `,
            {flag : 'a'}
            
        )
    } catch (err) { 
        console.log(err)
        
    }
}

start2()

// const { readFile }= require('fs')
// const { resolve } = require('path')
// const utill = require('util')

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf8', (err,data) => {
//             if (err) {
//                 reject(err)
//             }else{
//                 resolve(data)
//             }
//         } )

//     })
    
// }
// const start = async () => {
//     try {
//         const first = await getText("./content/first.txt")
//         const second = await getText("./content/second.txt")
//         console.log(first,second)
//     } catch (err) {
//         console.log(err)
        
//     }
// }

// start()

// the more profetional way of doing it ....but their is a even more peofessional way

// const { readFile,writeFile} = require('fs')
// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

// const start1 = async () => {
//     try {
//         const first = await readFilePromise("./content/first.txt",'utf-8')
//         const second = await writeFilePromise("./content/second.txt",'utf-8')
//         await writeFilePromise (
//             "./content/result-mind-grenade.txt",
//             `THIS IS NiCE : ${first} ${second}`
            
//         )
//     } catch (err) {
//         console.log(err)
        
//     }
// }

// start1()


