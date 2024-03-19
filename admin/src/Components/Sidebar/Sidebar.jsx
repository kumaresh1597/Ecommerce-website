import React from 'react'
import "./Sidebar.css";
import {Link} from 'react-router-dom';
import add_Product from '../../assets/Admin Panel Assets/Product_Cart.svg';
import product_list from '../../assets/Admin Panel Assets/Product_list_icon.svg';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to='/addProduct' style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={add_Product} alt='cart'/>
                <p>Add Product</p>
            </div>
        </Link>
        <Link to='/listProduct' style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={product_list} alt='cart'/>
                <p>List Product</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar