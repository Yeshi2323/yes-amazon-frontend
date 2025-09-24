import React from "react";
import CatagoryCard from "./CatagoryCard";
import { categoryList } from "./catagorylist.js";
import classes from "./catagory.module.css";
function Catagory() {
  return (
    <section className={classes.catagory_container}>
      {/* {categoryList.map((infos) => {
        return <CatagoryCard data={infos} />;
      })} */}
      {categoryList.map((infos, index) => {
        return <CatagoryCard key={index} data={infos} />;
      })}
    </section>
  );
}

export default Catagory;