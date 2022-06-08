import React, { useState } from "react";
//fire
import { auth, loginEmail, db } from "../shared/firebase";
//Route
import { Link, useNavigate } from "react-router-dom";
//Styled
import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = (props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setUserId(value);
    } else if (name === "password") {
      setUserPw(value);
    }
  };

  const loginFB = async () => {
    if ((userId == "" && userPw == "") || userPw == "" || userId == "") {
      alert("모두 입력해주세요");
    } else {
      try {
        const click_login = await loginEmail(userId, userPw);
        console.log("🎉");
        navigate("/");

        const q = query(
          collection(db, "users"),
          where("id", "==", click_login.user.email)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <Form>
        <LOG
          required
          name="email"
          type="email"
          placeholder="Email"
          value={userId}
          onChange={onChange}
        />
        <LOG
          required
          name="password"
          type="password"
          placeholder="Password"
          value={userPw}
          onChange={onChange}
        />
        <p style={{ color: "red" }}>{error}</p>
        <Button color="#212529" onClick={loginFB}>
          Login
        </Button>

        <Button
          onClick={() => {
            navigate("/sign");
          }}
          color="#fccb4f"
        >
          Sign Up
        </Button>
      </Form>
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
      border-color: #212529;
    }
  }
`;
const Button = styled.button`
  font-size: 18px;
  border-radius: 15px;
  margin-bottom: 15px;
  border: none;
  padding: 18px;

  letter-spacing: 2px;
  background-color: ${(props) => props.color};
  color: white;
  :hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
`;

export default Login;
