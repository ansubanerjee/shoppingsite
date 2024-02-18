const express = require("express");
const router =  express.Router()
const {Product} = require('../models/product');
const { Category } = require("../models/category");

// http://localhost:4000/api/v1/products
router.get(`/`, async (req, res) =>{
    const productList = await Product.find();

    if (!productList){
        res.status(500).json({success: false, message: "Products Could Not be Fetched"})
    }
    res.send(productList);
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

module.exports = router;