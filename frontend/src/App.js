import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';
import LogInSignUp from './Pages/LogInSignUp';
import CartPage from './Pages/CartPage';

const App = ()=>{
  
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/mens' element={<CategoryPage category="men"/>}/>
        <Route path='/womens' element={<CategoryPage category="women"/>}/>
        <Route path='/kids' element={<CategoryPage category="kids"/>}/>
        <Route path='/product' element={<ProductPage/>}>
          <Route path=':productId' element={<ProductPage/>}/>
        </Route>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/login-signup' element={<LogInSignUp/>}/>
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;


/*

import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../Assets/logo.png";
import cart from "../Assets/cart_icon.png";
import "./Navbar.css";

const Navbar = () => {
    
  return (
    <div>
        <div className="nav-logo">
            <img src={logo} alt='logo'/>
            <p>My Website</p>
        </div>
        <ul classname = "nav-menu">
            <li className = "menu-item">
                <Link className = "menu-link">Home</Link>
            </li>
            <li className = "menu-item">
                <Link className = "menu-link">Mens</Link>
            </li>
            <li className = "menu-item">
                <Link className = "menu-link">Womens</Link>
            </li>
            <li className = "menu-item">
                <Link className = "menu-link">Kids</Link>
            </li>
        </ul>
        <div className="nav-login-cart">
            <button>Login</button>
            <img src={cart} alt='cart'/>
        </div>
    </div>
  )
}

export default Navbar

*/