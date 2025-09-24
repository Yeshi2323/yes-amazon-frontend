import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import Layout from "../../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../../Api/endpoints";
import ProductCard from "../../../components/Product/ProductCard";
import Loader from "../../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [product, setProduct] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard product={product} flex={true} renderDesc={true} 
        renderAdd={true} />
      )}
      <div></div>
    </Layout>
  );
}

export default ProductDetail;
