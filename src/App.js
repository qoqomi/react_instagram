import React from "react";
import "./App.css";

import Sign from "./Pages/Sign";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Add from "./Pages/Add";
import Header from "./Pages/Header";
import { Routes, Route } from "react-router-dom";
import { auth } from "./shared/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
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
  }, []);

  console.log(auth.currentUser);
  return (
    <div className="App">
      <>
        <Header is_login={is_login} />
        <Routes>
          <Route path="/" exact element={<Main />}></Route>
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
