import React,{useState,useEffect} from 'react'
import "./ListProduct.css"

const ListProduct = () => {
     
      const [allProducts,setAllProducts] = useState([]);

      useEffect(()=>{
          getAllProducts();
      },[]);

      const getAllProducts = async ()=>{
          try{

              await fetch('http://localhost:8000/product/get-all-products',{
              method:"GET",
              headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
                }
              })
              .then((res)=>res.json())
              .then((res)=>{
                console.log(res.data)
                setAllProducts(res.data);
              })
          } catch(err){
              alert(err);
          }
      }

      const handleRemoveProduct = async (id)=>{
        try{

          await fetch('http://localhost:8000/product/delete-product',{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
            },
          body: JSON.stringify({id : id})
          })
          .then((res)=>res.json())
          .then(async (res)=>{
            console.log(res.data)
            await getAllProducts();
            alert(res.message);
          })
      } catch(err){
          alert(err);
      }
      }

  return (
    <div className='list-product'>
        <h1 className='all-product-title'>All Products</h1>
        <div className="all-prodcts-list-table">
          <div className="all-products-feild-headers">
            <p>Product</p>
            <p>Title</p>
            <p>Category</p>
            <p>Old price</p>
            <p>New price</p>
            <p>Action</p>
          </div>
          <div className='all-products-list-container'>
          <hr/>
          {
            allProducts.length > 0 ? (
              allProducts.map((product,index)=>(
                  <>
                  <div key={index} className = 'all-products-each-list all-products-feild-headers'>
                    <img src={product.image} alt="product image" className='product_list_image'/>
                    <p className='product_list_name'>{product.name}</p>
                    <p className='product_list_category'>{product.category}</p>
                    <p className='product_list_old_price'>{product.old_price}</p>
                    <p className='product_list_new_price'>{product.new_price}</p>
                    <button onClick={()=>{handleRemoveProduct(product.id)}} className='product_list_button'>X</button>
                  </div>
                  <hr/>
                  </>
              ))
            ):(<p>No Products Present</p>)
          }
          </div>
        </div>
    </div>
  )
}

export default ListProduct