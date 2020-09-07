const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const { ObjectID } = require('mongodb')
const { Router } = require('express')
const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')

const app = express()
const port = process.env.PORT 

//SendGrid Api Key : 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

// app.use((req, res, next) => {

//     if(req.method === 'GET'){
//         res.send('Get Requests are disabled')
//     }
//     else {
//         next()
//     }
//     //console.log(req.method, req.path)
// })

//Code to keep site under maintainence mode
// app.use((req, res, next) => {
//         res.status(503).send('Site is under maintainence. Please try later..')
// })

// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize : 1000000
//     },
//     fileFilter(req, file, cb){

//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a Document file'))
//         }

//         cb(undefined, true)
//         // cb(new Error('File must be a pdf'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })


// app.post('/upload', upload.single('upload'), (req, res)=> {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//
//Without middleware : new request -> run route handler
//
//With midleware : new request -> do something -> run route handler
//



app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

const Task = require('./models/task')
const User = require('./models/user')

// const main = async() => {
//     // const task = await Task.findById('5f54a5158e62c20f00ce6db8')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5f54a1513ec5ec6274b0493c')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()


// const pet = {
//     name: 'Hat'
// }



// pet.toJSON = function () {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))

//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')
//const myFunction = async () => {
//     const passeord = 'saaeej123@'
//     const hashedPassword = await bcrypt.hash(passeord, 8)

//     console.log(passeord)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('saaeej123@', hashedPassword)
//     console.log(isMatch)

       //const token = jwt.sign({_id: 'abc123'},'This is my new Course',{expiresIn: '7 days'})
       //console.log(token)

       //const data = jwt.verify(token, 'This is my new Course')
       //console.log(data)
//}

// //andrew --> poilaswedsad --> andrew (Encription Algorithm)
// //andrew ==> 3qqeq2@#@12dadsa (Hashing Algorithm)


 //myFunction()