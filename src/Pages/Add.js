import React, { useState } from "react";
//Styled
import styled from "styled-components";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";

import { storage, db } from "../shared/firebase";
import { addDoc, collection } from "firebase/firestore";

import { useSelector, useDispatch } from "react-redux";
import { createWish } from "../redux/modules/wish";

import { useNavigate, Link } from "react-router-dom";
import { auth } from "../shared/firebase";
import { addWishFB } from "../redux/modules/wish";
import { query, where, getDocs } from "firebase/firestore";
const Add = ({ Account }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const file_link_ref = React.useRef({ url: "" });
  const text_ref = React.useRef(null);

  const data = useSelector((state) => state.wish.list);

  // fileChage -> file 저장
  const onFileChange = async (e) => {
    //files.name=>이름을 정할 수 있음 ,무슨파일 올릴거니(현재 올린 파일 올릴거야)
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );

    // const file_url = await getDownloadURL(upload_file.ref);
    // file_link_ref.current = { url: file_url };
    const file_url = await getDownloadURL(upload_file.ref);

    file_link_ref.current = { url: file_url };
    console.log(file_link_ref.current);
  };

  const onClick = async () => {
    dispatch(
      addWishFB({
        text: text_ref.current.value,
        img_url: file_link_ref.current?.url,
      })
    );
    navigate("/");
  };

  return (
    <Container>
      <Input
        required
        name="nweet"
        type="text"
        ref={text_ref}
        placeholder="Today your mind..."
        cols="50"
        rows="10"
      />
      <LOG
        required
        accept="image/*"
        name="file"
        type="file"
        placeholder="Upload file"
        onChange={onFileChange}
      />

      <Button onClick={onClick} color="#212529">
        등록하기
      </Button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em 1em 0.5em 1em;
  padding-top: 100px;
  text-align: center;
`;

const Input = styled.textarea`
  height: 5rem;
  border-radius: 5px;
  padding: 5px;
`;

const LOG = styled.input`
  border: none;
  padding: 15px 0px;
  margin-bottom: 25px;
  font-size: 18px;
  outline: 0;

  :not([]) {
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
  padding: 15px;
  letter-spacing: 2px;
  background-color: ${(props) => props.color};
  color: white;
  :hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
`;
export default Add;
