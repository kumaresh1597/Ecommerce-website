const express = require('express');
const ProductRouter = express.Router();

const{addProduct,deleteProduct,getAllProducts} = require('../Models/ProductModel');

ProductRouter.post('/add-product',async (req,res)=>{
    const product = req.body;
    console.log(product);
    try{

        const productDb = await addProduct({product});

        return res.send({
            status:201,
            message : "Product create successfully",
            data : productDb
        })

    } catch(err){
        return res.send({
            status:500,
            message : "Internal server error",
            error : err
        })
    }

})

ProductRouter.get('/get-all-products',async (req,res)=>{

    try{

        const allProductsDb = await getAllProducts();
        return res.send({
            status : 200,
            message : "Read successfull",
            data : allProductsDb
        })

    }catch(err){
        return res.send({
            status: 500,
            message:"Internal server error",
            error : err
        })
    }
})

ProductRouter.post('/delete-product',async(req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.send({
            status: 400,
            message : "Product Id is required"
        })
    }
    try{

        const deleteDb = await deleteProduct({id});

        return res.send({
            status : 200,
            message: "Product deleted successfully",
            data : deleteDb
        })

    }catch(err){
        return res.send({
            status: 500,
            message:"Internal server error",
            error : err
        })
    }
})


module.exports = {ProductRouter};