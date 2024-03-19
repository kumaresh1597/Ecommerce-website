const ProductSchema = require('../Schemas/ProductSchema');


const addProduct = ({product})=>{
    return new Promise(async (resolve,reject)=>{

        const {name,image,category,new_price,old_price} = product;
        let id;
        try{

            const products = await ProductSchema.find({});
            if(products.length > 0){
                let lastProductArray = products.slice(-1);
                id = lastProductArray[0].id + 1;
            } else{
                id = 1;
            }
            
            const productObj = new ProductSchema({
                id : id,
                name,
                image,
                category,
                new_price,
                old_price,
             });

            const productDb = await productObj.save();
            resolve(productDb);

        }catch(err){
            reject(err);
        }
    })
}

const getAllProducts = ()=>{
    return new Promise(async (resolve,reject)=>{
        try{

            const allProductsDb = await ProductSchema.aggregate([
                {
                    $match : {isDeleted : {$ne : true}}
                }
            ]);
            resolve(allProductsDb);

        } catch(err){
            reject(err);
        }
    })
}

const deleteProduct = ({id})=>{
    return new Promise(async (resolve,reject)=>{
        try{

            const deleteDb = await ProductSchema.findOneAndUpdate({id},{isDeleted : true, deletedDateTime: Date.now()});

            resolve(deleteDb);

        } catch(err){
            reject(err);
        }
    })
}

module.exports = {addProduct,deleteProduct,getAllProducts};