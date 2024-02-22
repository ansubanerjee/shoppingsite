const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const {User} = require('../models/user');
const jwt = require('jsonwebtoken')

router.get('/', async (req,res)=>{
    const UserList = await User.find().select('-passwordHash');
    try{
        if(!UserList){
            res.status(404).json({success: false, message: "Users Cannot Be Fetched"});
        }
        res.status(200).send(UserList);
    }catch(err){
        res.status(500).json({success: false, error: err})
    }  
})
router.get(`/:_id`, async (req, res) =>{
    const user = await User.findById(req.params._id).select('-passwordHash');

    if (!user){
        res.status(500).json({success: false, message: "User was not found"})
    }
    res.status(200).send(user);
})

router.post('/', async (req, res)=>{
    const salt = env.process.salt;
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: bcrypt.hashSync(req.body.password,salt),
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

//Login
router.post('/login', async (req, res)=>{
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    try{
        if (!user){
            res.status(404).json({success: false, message: "User was not found"});
        }
        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
                {
                    userId : user.id,
                    isAdmin : user.isAdmin
                   
                }, secret,{
                    expiresIn: '1d'
                }
            )
            res.status(200).send({user: user.email, token: token})
        }else{
            res.status(400).json({success: false, message: "Password is Wrong"})
        }
    }catch(err){
        res.status(500).json({ error: err, success: false })
    }
})

//Register
router.post('/register', async (req, res)=>{
    const salt = env.process.salt;
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash: bcrypt.hashSync(req.body.password,salt),
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