const cron = require('node-cron');
const ProductSchema = require('./Schemas/ProductSchema');

const cleanBin = ()=>{
    cron.schedule("* * 0 * * *",async ()=>{
        try{

            const deletedProducts = await ProductSchema.find({isDeleted : true});

            const deletedProductsId = [];
            if(deletedProducts.length > 0){
                deletedProducts.map((product)=>{
                    const diff = (Date.now() - product.deletedDateTime)/1000*60*60*24;
                    console.log(diff);
                    if(diff > 30){
                        deletedProductsId.push(product._id);
                    }
                });
            } else {

            console.log("No Products to delete");
            }

            if(deletedProductsId.length > 0){
                const deleteDb = await ProductSchema.findOneAndDelete({_id : {$in : deletedProductsId}});
                console.log(deleteDb);
            }

        }catch(err){
            console.log(err);
        }
    })
}

module.exports = {cleanBin};