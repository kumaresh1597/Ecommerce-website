import React,{useState} from 'react'
import"./AddProduct.css"
import fileUpload from '../../assets/Admin Panel Assets/upload_area.svg';

const AddProduct = () => {

  const [image,setImage] = useState(false);

  const [product,setProduct] = useState({
    name:"",
    image:"",
    old_price:"",
    new_price:"",
    category:""
  });

  const imageHandler = (e)=>{
    setImage(e.target.files[0]);
  }

  const handleChange = (e) => {
    setProduct({...product,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     const formData = new FormData();
     console.log(image);
     formData.append("product",image);
     let productState = product;

     try{
      // Upload the image and get the URL
      await fetch('http://localhost:8000/upload',{
       method:"POST",
       headers:{
         "Accept":"application/json",
       },
       body:formData,
      })
      .then((response)=>response.json())
      .then((res)=>{
         console.log(res);

         if(res.status === 200){
          productState.image = res.image_url;
          console.log(productState);
         }
      })

      // Add the product to the database
      await fetch('http://localhost:8000/product/add-product',{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(productState),
      })
      .then((response)=> response.json())
      .then((res)=>{
         alert(res.message);
         setImage(false);
         setProduct({
           name:"",
           image:"",
           old_price:"",
           new_price:"",
           category:""
         })
      })
     }catch(err){
      alert(err.message);
     }
  }

  return (
    <div className='add-product'>
        <div className="add-product-item">
          <p>Product Name :</p>
          <input 
          type="text"
          placeholder="Product Name"
          name = "name"
          value = {product.name}
          onChange={handleChange}
          />
        </div>
        <div className="add-product-price">
          <div className="add-product-item">
            <p>Old Price :</p>
            <input 
            type="text"
            placeholder="Old Price"
            name = "old_price"
            value = {product.old_price}
            onChange={handleChange}
            />
          </div>
          <div className="add-product-item">
            <p>Offer Price :</p>
            <input 
            type="text"
            placeholder="Old Price"
            name = "new_price"
            value = {product.new_price}
            onChange={handleChange}
            />
          </div>
        </div>
        <div className="add-product-item">
          <p>Category :</p>
          <select name='category' onChange={handleChange} className='add-product-category'>
            <option value="" disabled selected hidden>Select Category</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="add-product-item">
          <label htmlFor='file-input'>
            <img src={image? URL.createObjectURL(image) : fileUpload} alt="upload image" className='add-product-uploading'/>
          </label>
          <input type='file' id='file-input' name='image' accept='Image/*' onChange={imageHandler} hidden />
        </div>
        <button className='add-product-btn' onClick={handleSubmit}>Add Product</button>
    </div>
  )
}

export default AddProduct