import React from "react";
import { useEffect } from "react";
import "./App.css";

import Sign from "./Pages/Sign";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Add from "./Pages/Add";
import Header from "./Pages/Header";
import { Routes, Route } from "react-router-dom";
import { auth } from "./shared/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { loadBucketFB, addBucketFB, LoadWishFB } from "./redux/modules/wish";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const [is_login, setIsLogin] = React.useState(false);
  const [Account, setAccount] = React.useState(null);

  const login_true = async (user) => {
    if (user) {
      setIsLogin(true);
      setAccount(user);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, login_true);
    dispatch(LoadWishFB());
  }, []);

  console.log(auth.currentUser, "로그인확인🎉");

  return (
    <div className="App">
      <>
        <Header is_login={is_login} />
        <Routes>
          <Route path="/" exact element={<Main Account={Account} />}></Route>
          <Route path="/add" exact element={<Add Account={Account} />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route
            path="/sign"
            exact
            element={<Sign Account={Account} />}
          ></Route>
        </Routes>
      </>
    </div>
  );
}

export default App;
