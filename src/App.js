import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import { CustomItemContext } from "./Context";
import Myorder from "./Myorder/Myorder";


function App() {
  
  return (
    <>
      <CustomItemContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<Myorder/>} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      </CustomItemContext>
    </>
  );
}

export default App;