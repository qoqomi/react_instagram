import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const Main = (Account) => {
  const data = useSelector((state) => state.wish.list);

  return (
    <>
      {data.map((el, i) => {
        return (
          <div key={i}>
            <Container>
              <div>
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                  src="https://blog.kakaocdn.net/dn/bftRiB/btqAjaghSBk/5CcN9W5qyCU8HLylVYcXb1/img.png"
                />
                <span>User</span>
              </div>
              <Big>
                <div>수정</div>
                <div>삭제</div>
              </Big>
            </Container>
            <Div>
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={
                  el.img_url
                    ? el.img_url
                    : "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg"
                }
              />
            </Div>

            <P>{el.text}</P>
          </div>
        );
      })}

      <AddBtn>
        <Link to="/add">
          <FontAwesomeIcon icon={faPlus} size="2x" style={{ color: "white" }} />
        </Link>
      </AddBtn>
    </>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1em 1em 0.5em 1em;
  padding-top: 75px;
  justify-content: space-between;

  div {
    margin: 0;
  }
  span {
    margin-left: 5px;
    font-weight: bold;

    vertical-align: middle;
  }
  img {
    float: left;
  }
`;

const P = styled.p`
  display: flex;
  padding: 0.5em 0.5em 0.5em 1em;
  font-size: 13px;
  font-weight: 600;
`;
const AddBtn = styled.div`
  background-color: #212529;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,
    rgb(60 64 67 / 15%) 0px 2px 6px 2px;
  //아이콘위치
  display: flex;
  justify-content: center;
  align-items: center;
  //box위치
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const Div = styled.div`
  height: 300px;
`;

const Big = styled.div`
  display: flex;
  &: first-child;
`;
export default Main;
