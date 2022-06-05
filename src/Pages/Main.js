import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../shared/firebase";
const Main = (props) => {
  console.log(props.is_login);
  return (
    <div>
      <button>Logout</button>

      <p>Main Page</p>
    </div>
  );
};

export default Main;
