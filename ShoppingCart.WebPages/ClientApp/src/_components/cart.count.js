import React from 'react';
import { Link } from "react-router-dom";
import './cart.style.css';

const CartCount = (props) =>{
    
    return(
        <Link to="/userCart">
        <a aria-current="page" className="nav-link active" href="">
            <i className="cartStyle fa fa-shopping-cart xxl text-white">
        </i><span className="badge badge-success badge-pill">{props.count}</span>
        </a>
        </Link>
    );
}

export default CartCount;