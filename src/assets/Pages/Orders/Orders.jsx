import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";
import Layout from "../../../components/Layout/Layout";
import { db } from "../../../Utility/firebase";
import { DataContext } from "../../../components/DataProvider/DataProvider";
import ProductCard from "../../../components/Product/ProductCard";

// ✅ import Firestore v9 helpers
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // ✅ reference: users/{uid}/orders
      const ordersRef = collection(doc(db, "users", user.uid), "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <p style={{ padding: "20px" }}>You don't have any orders yet.</p>
          )}
          <div>
            {orders?.map((eachOrder, i) => (
              <div key={eachOrder.id || i}>
                <hr />
                <p>Order ID {eachOrder.id}</p>
                {eachOrder?.data?.basket?.map((order, index) => (
                  <ProductCard
                    flex={true}
                    product={order}
                    key={order.id || index}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
