const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
const api = process.env.API_URL;
const productsRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');
const usersRouter = require('./routers/users')
//MiddleWare
app.use(express.json());
app.use(morgan('tiny'));


//Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoryRouter)
app.use(`${api}/users`, usersRouter)

mongoose.connect(process.env.connectionstring)
.then (()=>{
    console.log("Database Connection Established")
})
.catch((err)=>{
    console.log(err)
})


app.listen(4000, ()=>{
    console.log(api);
    console.log("Running at http://localhost:4000");
})