import React from 'react'
import "./Cartitem.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useValue } from '../../Context'; 

export default function Cartitem({ name, id, price, img, quantity }) {
 
  
  const { cartItems, setCartItems, totalAmt, setTotalAmt, increaseQuantity, decreaseQuantity,  } = useValue();
  // setQuantity(item.quantity);

  const handleRemoveToCart = () => {
    // Filter out the item from the cartItems array
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
    setCartItems(updatedCartItems);
    setTotalAmt(totalAmt - price)
    toast.success(`${name} remove to cart`);
  };

  

  

  return (
    <>
      <div className="cartitem">
        <img src={img} alt="" />
        <div className="productdetails">
          <p>{name}</p>
          <div className="price">
            <h2>&#8377; {price}</h2>
            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png" alt="" onClick={ () => decreaseQuantity(id)}/>
            <div>{quantity}</div>
            <img src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png" alt="" onClick={ () => increaseQuantity({id, price, name})}/>
          </div>
        </div>
        <button onClick={handleRemoveToCart}>Remove From Cart</button>
      </div>
    </>
  );
}