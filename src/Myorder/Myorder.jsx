import React from 'react';
import "./Myorder.scss";
import { useValue } from '../Context';

export default function Myorder() {
  const {  myorder, isMyorder } = useValue();
  const currentDate = new Date().toLocaleDateString(); // Get current date in the format "MM/DD/YYYY"

  // Calculate the total amount
  const Amount = myorder.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {isMyorder ? (
        <div className="myorder">
          <h1>Your Order</h1>
          <div className="orderdetails">
            <h2>Ordered On: {currentDate}</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {myorder.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <br />
              <br />
              <br />
              <tfoot>
                <tr>
                  <td colSpan={3}>Total Amount</td>
                  <td>{Amount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <h1 className='noorder'>No orders yet 😊😊</h1>
      )}
    </>
  );
}