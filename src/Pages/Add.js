import React, { useState } from "react";
//Styled
import styled from "styled-components";
import { getDownloadURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";
import { storage, db } from "../shared/firebase";
import { addDoc, collection } from "firebase/firestore";
const Add = ({ Account }) => {
  console.log(Account);
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [file_link, setFile_link] = useState(null);

  const onChange = (e) => {
    const { value } = e.target;

    setText(value);
    console.log(text);
  };
  const onFileChange = async (e) => {
    //files.name=>이름을 정할 수 있음 ,무슨파일 올릴거니(현재 올린 파일 올릴거야)
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(upload_file);

    const file_url = await getDownloadURL(upload_file.ref);
    setFile_link(file_url);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await addDoc(collection(db, "add"), {
      discription: text,
      file: file_link,
      uid: Account.uid,
    });
  };
  return (
    <Container onSubmit={onSubmit}>
      <Input
        required
        name="nweet"
        type="text"
        onChange={onChange}
        value={text}
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

      <Button type="submit" color="#212529">
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
