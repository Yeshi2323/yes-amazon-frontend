import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./assets/Pages/Landing/Landing";
import Payment from "./assets/Pages/Payment/Payment";
import Orders from "./assets/Pages/Orders/Orders";
import Cart from "./assets/Pages/Cart/Cart";
import Results from "./assets/Pages/Results/Results";
import ProductDetail from "./assets/Pages/ProductDetail/ProductDetail";
import Auth from "./assets/Pages/Auth/Auth";
// import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51S9r2qPkYtpzXsBrgiLQkOsIYsDBe25MZv4q3MJmmQPhm0eqDghxz6QkiURoHKiUNTifZcNLcKyltZspcqAWPojN00LNuO8G3j"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/Payments"
          element={
            <ProtectedRoute
              msg={"You need to login to make a payment"}
              redirect={"/Payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Orders"
          element={
            <ProtectedRoute
              msg={"You need to login to view your orders"}
              redirect={"/Orders"}
            >
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route path="/Orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
