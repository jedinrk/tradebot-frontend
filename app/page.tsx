"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

//import classes from "./Login.module.css";

import logoImage from "../public/next.svg";
//import AuthFooter from "../components/AuthFooter";
import { authenticate, signin } from "./auth/helpers";
import { Fragment } from "react";
import Link from "next/link";
import ZerodhaLogin from "./ZerodhaLogin/ZerodhaLogin";
import useWebSocket from "./hooks/useWebSocket";

const initialState = {
  loading: false,
  error: "",
  isSuccess: false,
  didRedirect: false,
};

export default function Home() {
  const [authState, setAuthState] = useState(initialState);

  const userIdRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setAuthState((prevAuth) => ({
      ...prevAuth,
      loading: true,
    }));

    const userID = userIdRef.current;
    const password = passwordRef.current;

    signin({ user_id: userID, password })
      .then((data: any) => {
        if (!data.success) {
          setAuthState((prevAuth) => ({
            ...prevAuth,
            loading: false,
            isSuccess: false,
            error: data.message,
          }));
          userIdRef.current = null;
          passwordRef.current = null;
        } else {
          const { token, user_id } = data.data;
          authenticate({ token, user_id }, () => {
            setAuthState((prevAuth) => ({
              ...prevAuth,
              isSuccess: true,
              loading: false,
              error: data.message,
              didRedirect: true,
            }));
          });
        }
      })
      .catch((err: any) => {
        setAuthState((prevAuth) => ({
          ...prevAuth,
          isSuccess: true,
          loading: false,
          error: err,
        }));
        userIdRef.current = null;
        passwordRef.current = null;
      });
  };

  // const performRedirect = () => {
  //   if (authState.didRedirect) {
  //     return <Redirect to="/" />;
  //   } else {
  //     return <Fragment />;
  //   }
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[600px] h-[1200px]">
        <ZerodhaLogin />
        {/* <div className={classes["form-container"]}>
          <Image src={logoImage} alt={""} className={classes.logo} />
          <h4>Login to Kite</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User ID (eg: AB0001)"
              ref={userIdRef}
            />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button type="submit" className={classes["btn-primary"]}>
              {authState.loading ? "Logging In" : "Login"}
            </button>
          </form>

          <Link href="/" className={classes["forgot-password"]}>
            {authState.error ? authState.error : "Forgot password?"}
          </Link>
          
        </div> */}
      </div>
    </main>
  );
}
