const express = require('express');
require('dotenv').config();

// Constant
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./db');
const cors = require('cors')
const {upload} = require('./Middleware/ImageUpload');
const {cleanBin} = require('./cron');

//Routers
const {ProductRouter} = require('./Controllers/ProductController');
const {AuthRouter} = require('./Controllers/AuthController');

//middleware
app.use(express.json());
app.use(cors());
app.use('/images',express.static('upload/images'));
app.use('/product',ProductRouter);
app.use('/auth',AuthRouter);


// API Endpoint
app.post('/upload',upload.single('product'),(req,res)=>{
    return res.json({
        status: 200,
        message: 'Image uploaded successfully',
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})



app.listen(PORT,(err)=>{
    if(!err){
    console.log(`Server is running on port ${PORT}`);
    cleanBin();
    } else{
        console.log("error : "+err)
    } 
});