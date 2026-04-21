import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-dvh">
        <Navbar />
        <div className="flex-1 pt-[64px]">
          <Home />
        </div>
        <Footer />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Verify />
      </>
    ),
  },
  {
    path: "/verify-email/:token",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <>
        {" "}
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "products",
    element: (
      <>
        {" "}
        <Navbar />
        <Products />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
