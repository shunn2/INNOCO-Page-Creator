import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Styled from "./styled";

const CreateGuestBook = ({
  dataComponent,
  ownerLoginId,
  projectName,
  pageName,
}) => {
  const [data, setData] = useState(dataComponent);
  const [userInput, setUserInput] = useState<string>("");
  const [nickname, setNickname] = useState<string>("익명");

  const handleClick = () => {
    const postData = {
      nickname,
      content: userInput,
      date: new Date(),
    };
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/data`, {
      ownerLoginId,
      projectName,
      pageName,
      type: "GUESTBOOK",
      data: postData,
    });
    setData((prev) => {
      const cur = JSON.parse(JSON.stringify(prev));
      cur.children[0].children.unshift({
        id: userInput,
        tag: "div",
        content: userInput,
        date: new Date().toUTCString(),
        nickname,
      });
      return cur;
    });
    setUserInput("");
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleTimeToDate = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <div {...data.sectionProps}>
      <Styled.GuestContainer
        style={{ width: data.children[1].props.style.width }}
      >
        <h4 className="my-3" style={{ color: "black" }}>
          {data.children[0].children.length}개의 방명록
        </h4>
      </Styled.GuestContainer>
      <div {...data.children[1].parentProps}>
        <textarea
          id="input"
          {...data.children[1].props}
          value={userInput}
          onChange={handleUserInput}
        />
        <div {...data.children[2].parentProps}>
          <Styled.NicknameWrapper
            onChange={(e) => setNickname(e.target.value)}
          />
          <button {...data.children[2].props} onClick={() => handleClick()}>
            작성
          </button>
        </div>
        {data.children[0].children.map((comment, idx) => (
          <div key={comment.id} style={{ margin: "12px 0", color: "black" }}>
            <Styled.WriterInfo>
              <Styled.WriterName>{comment.nickname}</Styled.WriterName>
              <Styled.WriteDate>
                {handleTimeToDate(comment.date)}
              </Styled.WriteDate>
            </Styled.WriterInfo>
            <div>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateGuestBook;
