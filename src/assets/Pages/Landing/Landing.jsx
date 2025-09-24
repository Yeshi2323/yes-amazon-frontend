import React from "react";
import classes from "./Landing.module.css";
import Carousels from "../../../components/Carousel/Carousels";
import Catagory from "../../../components/Catagory/Catagory";
import Product from "../../../components/Product/Product";
import Layout from "../../../components/Layout/Layout";

function Landing() {
  return (
    <Layout>
      <Carousels />
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landing;
