import React from "react";
import "./App.css";

import Sign from "./Pages/Sign";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Add from "./Pages/Add";

import { Routes, Route } from "react-router-dom";
import { auth, loginCheck } from "./shared/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [is_login, setIsLogin] = React.useState(false);

  const login_true = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, login_true);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/main"
          exact
          element={<Main is_login={is_login} />}
        ></Route>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/sign" exact element={<Sign />}></Route>
        <Route path="/add" exact element={<Add />}></Route>
      </Routes>
    </div>
  );
}

export default App;