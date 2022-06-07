import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../shared/firebase";
import { connectStorageEmulator } from "firebase/storage";

const Header = ({ is_login }) => {
  const navigate = useNavigate();

  const HandleLogout = () => {
    console.log(is_login);
    if (is_login) {
      signOut(auth);
      alert("로그아웃되었습니다!");
      console.log("logout!");
    } else {
      navigate("/login");
    }
  };
  return (
    <Container>
      {" "}
      <Link to="/">
        <FontAwesomeIcon
          style={{
            position: "fixed",
            top: "0",
            left: "10",
            margin: "10px 10px 0px 0px ",
            color: "#212529",
          }}
          icon={faHouse}
          size="2x"
        />
      </Link>
      <Button onClick={HandleLogout} style={{ height: "30px", width: "70px" }}>
        {is_login ? "로그아웃" : "로그인"}
      </Button>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 20px;
  padding: 1rem;

  background: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  height: 30px;
  width: 70px;
  border-radius: 20px;
  background-color: #212529;
  border: 1px solid;
  color: white;
  text-transform: uppercase;
  transition: all 0.25s ease-in 0s;
  font-weight: bold;

  &:hover {
    background-color: white;
    color: #212529;
  }
`;
export default Header;
