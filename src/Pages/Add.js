import React, { useState } from "react";
//Styled
import styled from "styled-components";

const Add = (props) => {
  const [nweet, setNweet] = useState("");

  const onChange = (e) => {
    const { value } = e.target;

    setNweet(value);
    console.log(nweet);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container onSubmit={onSubmit}>
      <Input
        required
        name="nweet"
        type="text"
        onChange={onChange}
        value={nweet}
        placeholder="Today your mind..."
        cols="50"
        rows="10"
      />
      <LOG required name="file" type="file" placeholder="Upload file" />
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
