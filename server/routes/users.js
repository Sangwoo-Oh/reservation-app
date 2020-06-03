const express = require('express')
const router = express.Router()
const User = require('../model/user')


router.post('/login', function(req, res) {
//   Product.find({}, function(err, foundProducts) {
//     return res.json(foundProducts)
//   })
})

router.post('/register', function(req, res) {
 const username = req.body.username
 const email = req.body.email
 const password = req.body.password
 const confirmPassword = req.body.confirmPassword

 if(!username) {
     //invalid error
     return res.status(422).send({ errors: [{title: 'User error', detail: 'Please fill username'}] })
 }
 if(!email) {
    //invalid error
    return res.status(422).send({ errors: [{title: 'User error', detail: 'Please fill email'}] })
 }
 if(!password) {
    //invalid error
    return res.status(422).send({ errors: [{title: 'User error', detail: 'Please fill password'}] })
 }
 if(password !== confirmPassword) {
    //invalid error
    return res.status(422).send({ errors: [{title: 'User error', detail: 'Please check password'}] })

 }
 User.findOne({email}, function(err, foundUser) {
    if(err) {
        //Error Message
        return res.status(422).send({ errors: [{title: 'User error', detail: 'Something went wrong'}] })
    }
    if(foundUser) {
          //invalid error
    return res.status(422).send({ errors: [{title: 'User error', detail: 'User already exist'}] })
    }

    const user = new User({username, email, password})
    user.save(function(err) {
        if(err) {
            //Error Message
            return res.status(422).send({ errors: [{title: 'User error', detail: 'Something went wrong 最後'}] })
        }
        return res.json({ "registered": true })
      })
 })
})

module.exports = router
