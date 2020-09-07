const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks' ,auth ,async (req, res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

//GET /tasks?complete=true or false
//limit, skip -> MEthods for pagination
//GET /tasks?limit=10&skip=0 for fixed no of items in a page
//lmit shows the no of items in the first page where as "skip" shows the no of items from the skip number given
//GET /tasks?sortBy=createdAt_asc/dsc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 
    }
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    try {
    //  const tasks = await Task.find({owner : req.user._id, completed: true})  
    //await req.user.populate('tasks').execPopulate()
    console.log(req.user.tasks)
      await req.user.populate({
          path: 'tasks',
          options:{
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
          },
          match
      }).execPopulate()
      res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send()
    }
    // Task.find({}).then((tasks) => {
    //     res.status(200).send(tasks)
    // }).catch((e)=> {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        // if(!mongoose.Types.ObjectId.isValid(_id)){
        //     return res.status(400).send({error: 'Invalid Task ID!'})
        // }
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
    // console.log(_id)
    // if(!mongoose.Types.ObjectId.isValid(_id)){
    //     return res.status(400).send({error: 'Invalid Task ID!'})
    // }
    // Task.findById(_id).then((task) => {
    //     console.log(task)
    //     if(!task){
    //         return res.status(404).send(task)
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updateParameters = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidUpdate = updateParameters.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        res.status(400).send({Error: 'Invalid Update parameter'})
    }
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        //const task = await Task.findById(req.params.id)
        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            res.status(404).send()
        }
        updateParameters.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(400).send({Error: 'Invalid id'})
        }
        res.send('Deleted Task' + task)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router
