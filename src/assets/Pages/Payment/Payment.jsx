import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../../components/Layout/Layout";
import { DataContext } from "../../../components/DataProvider/DataProvider";
import ProductCard from "../../../components/Product/ProductCard";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../../components/CurrencyFormat/CurrencyFormat";
import axiosInstance from "../../../Api/axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// ✅ Firestore modular imports
import { db } from "../../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { Type } from "../../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    if (!cardElement || cardElement._empty) {
      setCardError("Please enter your card details");
      return;
    }
    try {
      setProcessing(true);

      // 1. Ask backend for clientSecret
      const response = await axiosInstance.post(
        `/payments/create?total=${total * 100}`
      );
      const clientSecret = response.data?.clientSecret;

      // 2. Confirm card payment with Stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3. Save order in Firestore
      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      // 4. Clear basket and navigate to orders page
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/Orders", {
        state: { msg: "Your order is placed successfully" },
      });
    } catch (error) {
      console.error("Payment error:", error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.paymentheader}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user.email}</div>
            <div>123 Main St</div>
            <div>Addis Ababa, 1000</div>
          </div>
        </div>
        <hr />

        {/* product summary */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form autoComplete="off" onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* card element */}
                <CardElement
                  onChange={handleChange}
                  options={{
                    disableLink: true,
                    style: { base: { fontSize: "16px" } },
                  }}
                />

                {/* price */}
                <div className={classes.payment_price}>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total order</p> <CurrencyFormat amount={total} />
                  </span>
                </div>

                <button type="submit" disabled={processing}>
                  {processing ? (
                    <div className={classes.loading}>
                      <ClipLoader color="grey" size={20} />
                      <p>please wait...</p>
                    </div>
                  ) : (
                    "Pay now"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
