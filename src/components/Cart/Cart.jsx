import React from 'react'
import Cartitem from './Cartitem'
import "./Cart.scss";
import { useValue } from '../../Context';
import { Link } from 'react-router-dom';


export default function Cart() {
  const { cartItems, setCartItems, totalAmt, setTotalAmt, setIsMyOrder,  setMyOrder } = useValue();

  const handlepurchase = ()=>{
    setIsMyOrder(true);
    setMyOrder(cartItems);
    setCartItems([]);
    setTotalAmt(0);
    
  }
  
  return (
    <>
    {cartItems.length >0 ? (
      <div className="cartaside">
        <h3>TotalPrice &#8377; {totalAmt}/-</h3>
        <Link to="/myorder">
        <button className="purchasebtn"onClick={handlepurchase} >Purchase</button>
        </Link>
      </div>
      ):""}
      <div className="cart">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Cartitem key={item.id} name={item.name} img={item.img} price={item.price} id={item.id} quantity={item.quantity} />
          ))
        ) : (
          <p className='empty'>Your cart is empty😊😊</p>
        )}
      </div>
    </>
  )
}