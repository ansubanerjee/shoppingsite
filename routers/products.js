const express = require("express");
const router =  express.Router()
const {Product} = require('../models/product');
const { Category } = require("../models/category");
const mongoose = require("mongoose");
// http://localhost:4000/api/v1/products

router.get(`/`, async (req, res) =>{
    const productList = await Product.find().populate('category');
    if (!productList){
        res.status(500).json({success: false, message: "Products Could Not be Fetched"});
    }
    res.send(productList);
}) 

router.get('/:_id', async (req, res)=>{
    const product = await Product.findById(req.params._id).populate('category');
    if (!product){
        res.status(400).json({success: false, message: "Product was not found"});
    }
    res.status(200).send(product);
})

router.post(`/`, async (req, res) =>{
    const category = await Category.findById(req.body.category)
    if (!category){
        res.status(400).json({success: false, message: "Invalid Category"})
    }
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
    await product.save();
    try{
        if (product){
            res.status(201).send(product)
        }
        if(!product){
            res.status(400).json({ message: "Product could not be created", success: false})
        }
    }catch(err){
        res.status(500).json({ error: err, success: false })
    }
  })

router.put('/:_id', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params._id)){
        res.status(400).json({success: false, message: "Invalid Product ID"})
    }
    const category = await Category.findById(req.body.category)
    if (!category){
        res.status(400).json({success: false, message: "Invalid Category"})
    }

    const product = await Product.findByIdAndUpdate(
        req.params._id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        }, {new: true})

    if (!product){
        return res.status(500).send('The Product could not be Updated')
    }
    res.send(product);
        })

router.delete('/:_id', async (req,res)=>{
    const product = await findByIdAndDelete(req.params._id)
    try{
        if (!product){
            res.status(404).json({ success: false, message: "Product was not found"})
        }
        res.status(200).json({ success: true, message: "Product was Deleted"})
    }catch(err){
        res.status(400).json({ success: false, error: err})
    }
})
router.get('/get/count', async (req, res)=>{
    const productCount = await Product.countDocuments((count)=> count)
    if (!productCount){
        res.status(404).json({ success: false, message: "Product was not found"})
    }
    res.status(200).send({
        count: productCount
    })
})
module.exports = router;