import React, { useState } from "react";
import styled from "styled-components";
//fire
import { auth, loginEmail } from "../shared/firebase";
//Route
import { Link, useNavigate } from "react-router-dom";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <Link to="/main">
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
        <Button color="#288c28" onClick={loginFB}>
          Login
        </Button>

        <Button
          onClick={() => {
            navigate("/sign");
          }}
          color="#8FBC8F"
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
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
`;

export default Login;
