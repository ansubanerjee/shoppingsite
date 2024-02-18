const express = require('express');
const router = express.Router();
const {User} = require('../models/user');

router.get('/', async (req,res)=>{
    const UserList = await User.find();
    try{
        if(!UserList){
            res.status(404).json({success: false, message: "Users Cannot Be Fetched"})
        }
        res.status(200).send(UserList);
    }catch(err){
        res.status(500).json({success: false, error: err})
    }  
})

router.post('/', async (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: req.body.passwordHash,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        isAdmin: req.body.isAdmin    
    })
    await user.save();
    try{
        if(!user){
        return res.status(400).send({ message: "Product could not be created", success: false})
        }res.status(201).send(user)
    }catch(err){
        res.status(500).json({ error: err, success: false })
    }
})

module.exports = router;