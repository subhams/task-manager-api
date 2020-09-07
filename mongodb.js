// //CRUD Create Read Update Delete

// // const mongodb = require('mongodb')
// // const MongoClient = mongodb.MongoClient
// // const ObjectId = mongodb.ObjectID

// const {MongoClient , ObjectID} = require('mongodb')

// const connectionUrl = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// // const id = new ObjectID()
// // console.log(id.id.length)
// // console.log(id.toHexString().length)
// // console.log(id.getTimestamp())

// MongoClient.connect(connectionUrl, { useNewUrlParser : true }, (error, client) => {
//     if(error){
//         return console.log('Unable to connect to database')
//     }
//     // console.log('Connected Successfully')

//     const db = client.db('databaseName')
//     // db.collection('Users').deleteMany({
//     //     age:28
//     // }).then((result)=> {
//     //     console.log(result.deletedCount)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

//     db.collection('Tasks').deleteOne({
//         description : 'Task 1'
//     }).then((result)=> {
//         console.log(result.deletedCount)
//     }).catch((error) => {
//         console.log(error)
//     })
// })

