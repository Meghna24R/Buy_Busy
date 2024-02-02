import { createContext, useContext, useState } from "react";

const ItemContext = createContext();

function useValue() {
  const value = useContext(ItemContext);
  return value;
}

function CustomItemContext({ children }) {
  const [signIn, setSignIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmt, setTotalAmt] = useState();
  const [quantity, setQuantity] = useState(1);
  const [amt, setAmt] = useState(100000);
  const [isMyorder, setIsMyOrder] = useState(false);
  const [myorder, setMyOrder] = useState([]);
  const [name, setName] = useState('');

  const handleSignin = () => {
    if (signIn) {
      setSignIn(false);
      emptyField();
    }
  };

  const emptyField = () => {
    setEmail("");
    setPassword("");
  };

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    console.log(total);
    return total;
  };

  const increaseQuantity = (prod) => {
    const index = cartItems.findIndex((item) => item.id === prod.id);

    if (index === -1) {
      setCartItems([...cartItems, { ...prod, quantity: 1 }]);
    } else {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity++;
      setCartItems(updatedCartItems);
    }

    setTotalAmt(calculateTotalAmount());
    setQuantity(prod.quantity + 1);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === itemId && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
    setTotalAmt(calculateTotalAmount());
    setQuantity(quantity - 1);
  };

  return (
    <ItemContext.Provider
      value={{
        name,
        setName,
        userId,
        setUserId,
        signIn,
        setSignIn,
        email,
        setEmail,
        password,
        setPassword,
        handleSignin,
        cartItems,
        setCartItems,
        totalAmt,
        setTotalAmt,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        quantity,
        amt, 
        setAmt,
        isMyorder, 
        setIsMyOrder,
        myorder, 
        setMyOrder,
        emptyField
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export { useValue, CustomItemContext };