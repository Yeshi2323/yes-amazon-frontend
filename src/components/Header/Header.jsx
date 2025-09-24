import classes from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader.jsx";
import { SlLocationPin } from "react-icons/sl";
import amazonlogo from "./amazonlogo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import { auth } from "../../Utility/firebase.js";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt=""
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search products" />
            <BsSearch size={38} />
          </div>
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://icons.iconarchive.com/icons/wikipedia/flags/512/US-United-States-Flag-icon.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {user ? (
              <div
                className={classes.signOut}
                onClick={() => auth.signOut()}
                style={{ cursor: "pointer" }}
              >
                <p>Hello {user?.email?.split("@")[0]}</p>
                <span>Sign Out</span>
              </div>
            ) : (
              <Link to="/Auth">
                <div>
                  <p>Sign In</p>
                  <span>Account & Lists</span>
                </div>
              </Link>
            )}

            <Link to="/Orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/Cart" className={classes.cart}>
              <BiCart size={38} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
