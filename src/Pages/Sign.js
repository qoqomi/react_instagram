import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
//fire
import { signupEmail, auth, db } from "../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
//changePage
import { Navigate } from "react-router-dom";
const Sign = () => {
  const navigate = useNavigate();

  const [addEmail, setaddEmail] = useState("");
  const [addPw, setAddPw] = useState("");
  const [addNickname, setAddNickname] = useState("");

  const signup = async () => {
    if (addEmail == "" && addPw == "" && addNickname == "") {
      alert("모두 입력해주세요");
    } else {
      try {
        //signUp
        const user = await signupEmail(addEmail, addPw);
        //foreStore
        const data = await addDoc(collection(db, "users"), {
          name: addNickname,
          id: addEmail,
        });
        console.log(user, data.id);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const test = () => {};
  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            margin: "10px 10px 0px 0px ",
            color: "gray",
          }}
          icon={faHouse}
          size="2x"
        />
      </Link>
      <div>
        <Form method="get" id="login-form">
          <LOG
            required
            name="email"
            type="email"
            placeholder="Email"
            value={addEmail}
            onChange={(e) => {
              setaddEmail(e.target.value);
            }}
          />
          <LOG
            required
            name="nickname"
            type="text"
            placeholder="Nickname"
            value={addNickname}
            onChange={(e) => {
              setAddNickname(e.target.value);
            }}
          />
          <LOG
            required
            type="password"
            placeholder="Password"
            value={addPw}
            onChange={(e) => {
              setAddPw(e.target.value);
            }}
          />

          <Button onClick={signup} color="#288c28">
            Sign Up
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Login
          </Button>
        </Form>
      </div>
    </div>
  );
};
const Form = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const LOG = styled.input`
  border: none;
  padding: 15px 0px;
  margin-bottom: 25px;
  font-size: 18px;
  outline: 0;
  :not([type="submit"]) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s ease-in-out;
    :focus {
      border-color: #288c28;
    }
  }
`;
const Button = styled.button`
  font-size: 18px;
  border-radius: 15px;
  margin-bottom: 15px;
  border: none;
  padding: 18px;
  background-color: ${(props) => props.color};
  :hover {
    box-shadow: 6px 6px 6px 0 rgba(0, 0, 0, 0.19);
  }
`;
export default Sign;
