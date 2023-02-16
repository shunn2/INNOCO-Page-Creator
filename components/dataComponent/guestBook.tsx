import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Styled from "./styled";

const URL = "http://10.5.26.54:8080";

const CreateGuestBook = ({
  dataComponent,
  ownerLoginId,
  projectName,
  pageName,
}) => {
  const [data, setData] = useState(dataComponent);
  const [userInput, setUserInput] = useState("");

  const handleClick = () => {
    const postData = {
      nickname: "성훈",
      content: userInput,
      date: new Date(),
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/data`, {
        ownerLoginId,
        projectName,
        pageName,
        type: "GUESTBOOK",
        data: postData,
      })
      .then((res) => console.log(res));
    setData((prev) => {
      const cur = JSON.parse(JSON.stringify(prev));
      cur.children[0].children.push({
        id: userInput,
        tag: "div",
        content: userInput,
        date: new Date().toUTCString(),
        nickname: "익명",
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
    return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div {...data.sectionProps}>
      <Styled.GuestContainer
        style={{ width: data.children[1].props.style.width }}
      >
        <h4 className="my-3">{data.children[0].children.length}개의 방명록</h4>
        {data.children[0].children.map((comment, idx) => (
          <div key={comment.id} style={{ margin: "12px 0" }}>
            <Styled.WriterInfo>
              <Styled.WriterName>{comment.nickname}</Styled.WriterName>
              <Styled.WriteDate>
                {handleTimeToDate(comment.date)}
              </Styled.WriteDate>
            </Styled.WriterInfo>
            <div>{comment.content}</div>
          </div>
        ))}
      </Styled.GuestContainer>
      <div {...data.children[1].parentProps}>
        <textarea
          id="input"
          {...data.children[1].props}
          value={userInput}
          onChange={handleUserInput}
        />
        <div {...data.children[2].parentProps}>
          <button {...data.children[2].props} onClick={() => handleClick()}>
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGuestBook;
