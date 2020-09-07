const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')

router.post('/users',async (req, res) => {
    const user = new User(req.body)
try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({user , token})
} catch (e) {
    res.status(400).send(e)
}
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        //console.log(user)
        //console.log(token)
        res.send({user , token})
    }catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Succesfully Logged Out')
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
            req.user.tokens = []
            await req.user.save()
            res.send()
    }catch (e){
        res.status(500).send('Successfully Logged Out All USers')
    }
})

router.get('/users/me', auth, async (req, res)=>{

    res.send(req.user)

    /* try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    } */

    
    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// router.get('/users/:id',auth, async (req, res) => {
//     const _id = req.params.id
//     try{
        
//         if (!mongoose.Types.ObjectId.isValid(_id)){
//                 return res.status(400).send({error: 'Invalid User ID!'})
//               }
//         const user =  await User.findById(_id)
//         if(!user){
//                     return res.status(404).send(user)
//                 }
//             res.send(user)      
//     } catch(e) {
//         res.status(500).send()
//     }
      
    
//     // if (!mongoose.Types.ObjectId.isValid(_id)){
//     //     return res.status(400).send({error: 'Invalid USer ID!'})
//     //   }
//     // User.findById(_id).then((user) => {
//     //     if(!user){
//     //         return res.status(404).send(user)
//     //     }
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

router.patch('/users/me' ,auth , async (req, res) => {
    const updateParameters = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']

    const isValidOperation = updateParameters.every((updatedParameter) => allowedUpdates.includes(updatedParameter))
    if(!isValidOperation){
        return res.status(400).send({Error :'Invalid Update'})
    }
    try{
        //const user = await User.findById(req.params.id)
        updateParameters.forEach((updatedParameter) => req.user[updatedParameter] = req.body[updatedParameter])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})
        // if(!user) {
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,  async(req,res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(400).send({Error:'Invalid id'})
        // }
        
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.send('Deleted User :'+req.user)
    }catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an Image file'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'),async (req,res) => {

    const buffer = await sharp(req.file.buffer).png().resize({ width: 250, height:250 }).toBuffer()
    req.user.avatar = buffer
    //req.user.avatar = req.file.buffer
    //console.log(req.file.buffer)
    await req.user.save()
    res.send()
},(error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async(req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res)=> {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})



module.exports = router