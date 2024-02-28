
const express = require('express');
const router = express.Router();
const {Order} = require('../models/order');
const {OrderItem} = require('../models/order-item')

router.get(`/`, async(req, res)=>{
    const orderList = await Order.find();
    try{
        if(!orderList){
            res.status(500).json({ success: false, message: "Order List was not found"})
        }
        res.status(200).send(orderList)
    }catch(err){
        res.status(500).json({ success: false, error: err})

    }
    
})

router.post('/', async (req, res)=>{

    const orderItemIds = req.body.orderItems.map(async orderItem =>{
        let newOrderItem = new OrderItem({
            product: orderItem.product,
            quantity: orderItem.quantity
        })
        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    })
    console.log(orderItemIds);
    
    let order = new Order({
        orderItems: orderItemIds,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user
    })
    order = await order.save();
    console.log(order);
    try{
        if(!order){
            return res.status(404).send('Order cannot be created')}
        res.status(200).send(order);
    }catch(err){
        return res.status(500).json({ success: false, error: err})
    }
    
})

module.exports = router; 