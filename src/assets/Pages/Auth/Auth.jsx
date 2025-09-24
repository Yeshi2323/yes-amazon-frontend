import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../../components/DataProvider/DataProvider";
import { Type } from "../../../Utility/action.type";

function Auth() {
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  function authHandler(e) {
    e.preventDefault();

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({ type: Type.SET_USER, user: userinfo.user });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({ type: Type.SET_USER, user: userinfo.user });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  }

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              color: "red",
              padding: "5px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
            />
          </div>

          <button
            name="signin"
            type="submit"
            onClick={authHandler}
            className={classes.login_SignInbutton}
          >
            {loading.signIn ? <ClipLoader size={20} color="#fff" /> : "Sign in"}
          </button>
        </form>

        <p>
          By signing in, you agree to Amazon fake clone conditions of use &
          sale. Please see our privacy notice, cookies notice, and
          interest-based ads notice.
        </p>

        <button
          name="signUp"
          type="button"
          onClick={authHandler}
          className={classes.login_registerbutton}
        >
          {loading.signUp ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ color: "red", paddingTop: "5px" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
