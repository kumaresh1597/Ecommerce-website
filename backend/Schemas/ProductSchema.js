const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: {
        type : Number,
        required: true,
        unique:true
    },
    name:{
        type : String,
        required : true
    },
    image:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    },
    new_price:{
        type : Number,
        required : true
    },
    old_price:{
        type : Number,
        required : true
    },
    date:{
        type : Date,
        default: Date.now
    },
    isAvailable:{
        type : Boolean,
        default: true
    },
    isDeleted:{
        type: Boolean,
        default:false
    },
    deletedDateTime:{
        type: String
    }

})

module.exports = mongoose.model('Product', ProductSchema);