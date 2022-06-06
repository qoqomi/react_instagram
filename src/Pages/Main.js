import React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../shared/firebase";

const Main = (props) => {
  const HandleLogout = () => {
    signOut(auth);
    alert("로그아웃되었습니다!");
    console.log("logout!");
  };
  return (
    <div>
      <button onClick={HandleLogout}>Logout</button>

      <p>Main Page</p>
    </div>
  );
};

export default Main;
