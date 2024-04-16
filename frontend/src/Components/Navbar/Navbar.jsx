import React, { useState } from 'react'
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {

    const[menu,setMenu] = useState("home");
    
  return (
    <div className='nav-bar'>
        <div className="nav-logo">
            <img src={logo} alt='logo'/>
            <p>My Website</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>setMenu("home")}><Link style={{textDecoration:'none',color:'grey'}} to = '/'>Home{menu === 'home'? <hr/> : <></> }</Link></li>
            <li onClick={()=>setMenu("men")}><Link style={{textDecoration:'none',color:'grey'}} to = '/mens'>Men{menu === 'men'? <hr/> : <></> }</Link></li>
            <li onClick={()=>setMenu("women")}><Link style={{textDecoration:'none',color:'grey'}} to = '/womens'>Women{menu === 'women'? <hr/> : <></> }</Link></li>
            <li onClick={()=>setMenu("kid")}><Link style={{textDecoration:'none',color:'grey'}} to = '/kids'>Kids{menu === 'kid'? <hr/> : <></> }</Link></li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login-signup'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt='cart'/></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default Navbar