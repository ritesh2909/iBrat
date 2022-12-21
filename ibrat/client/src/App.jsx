import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import "./app.css";
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

const App = () => {

  const user = true;

  return (
    <>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Register />} />
        <Route path='/login' element={user ? < Navigate to={"/"} /> : <Login />} />
        <Route path='/register' element={user ? < Navigate to={"/"} /> : <Register />} />

        <Route path='/cart' element={user ? <Cart /> : <Register />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>

    </>
  )
};

export default App;