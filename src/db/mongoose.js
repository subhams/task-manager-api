const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useFindAndModify : false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// const me = new User({
//     name: '   Girisha  ',
//     email: ' gir12@gmail.com ',
//     password: 'erewaasda12@',
//     age:20
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })

const Task = mongoose.model('Tasks',{
    description:{
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type : Boolean,
        default: false
    }
})

// const task = new Task({
//     description : '  Task5  ',
//     completed: true
// })
// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=> {
//     console.log('Error', error)
// })