import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
//fire
import { signupEmail, auth, db, storage } from "../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
//changePage
import { Navigate } from "react-router-dom";
import { async } from "@firebase/util";
//storage
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Sign = ({ Account }) => {
  const navigate = useNavigate();

  const [addEmail, setaddEmail] = useState("");
  const [addPw, setAddPw] = useState("");
  const [addNickname, setAddNickname] = useState("");
  const [error, seterror] = useState("");
  const [file, setFile] = useState("");

  const onChange = (e) => {
    const { value, name } = e.target;

    if (name === "email") {
      setaddEmail(value);
    } else if (name === "password") {
      setAddPw(value);
    } else if (name === "nickname") {
      setAddNickname(value);
    }
  };
  const signup = async () => {
    console.log(file);
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
          image_url: file,
          uid: Account.uid,
        });
        console.log(user, data.id);
        alert("가입을 축하합니다");
        navigate("/");
      } catch (error) {
        seterror(error.message);
      }
    }
  };

  const onChangeFile = async (e) => {
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    console.log(file_url);
    setFile(file_url);
  };

  return (
    <div>
      <div>
        <Form>
          <LOG
            required
            name="email"
            type="email"
            placeholder="Email"
            value={addEmail}
            onChange={onChange}
          />
          <LOG
            required
            name="nickname"
            type="text"
            placeholder="Nickname"
            value={addNickname}
            onChange={onChange}
          />
          <LOG
            required
            name="password"
            type="password"
            placeholder="Password"
            value={addPw}
            onChange={onChange}
          />
          <LOG
            required
            accept="image/*"
            name="file"
            type="file"
            placeholder="Upload file"
            onChange={onChangeFile}
          />
          <p style={{ color: "red" }}>{error}</p>
          <Button onClick={signup} color="#fccb4f">
            Sign Up
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            color="#212529"
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
  color: white;
  letter-spacing: 2px;
  background-color: ${(props) => props.color};
  :hover {
    box-shadow: 6px 6px 6px 0 rgba(0, 0, 0, 0.19);
  }
`;
export default Sign;
