import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as s from "./Styled.jsx";
import API from "../../api/axios.jsx";

// import { Date } from "react-datepicker";

const customModalStyles = {
  content: {
    backgroundColor: "transparent",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    padding: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const Input = styled.input`
  background: #f0f5fb; // 배경을 투명하게 설정
  border: none;
  width: 71%;
  padding: 0.2rem;
  font-size: 3rem;
  margin-top: 20px;
  margin-right: 20px;
  font-family: "DM Sans";
  color: rgba(0, 0, 0, 0.5);
`;
const DateInput = styled(DatePicker)`
  background: #f0f5fb;
  border: none;
  width: 140%;
  padding: 0.2rem;
  font-size: 3rem;
  margin-top: 20px;
  margin-right: px;
  font-family: "DM Sans";
  color: rgba(0, 0, 0, 0.5);
`;

const AddBtn = ({ currentPage }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddEvent = async (e) => {
    e.preventDefault();

    let apiEndpoint = "/api/schedule/personal";

    if (currentPage === "team") {
      apiEndpoint = "/api/schedule/team";
    }

    const data = {
      title: title,
      content: content,
      scheduleType: currentPage === "team" ? "TEAM" : "SCHEDULE",
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };

    try {
      const response = await API.post(apiEndpoint, data);
      console.log(response.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setModalIsOpen(false);
  };

  return (
    <>
      <s.AddButton onClick={() => setModalIsOpen(true)}>+</s.AddButton>
      <s.AddBtnModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
      >
        <s.AddBtnContainer>
          <form onSubmit={handleAddEvent}>
            <s.FlexContainer>
              <s.ModalLabel>제목:</s.ModalLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </s.FlexContainer>
            <s.FlexContainer>
              <s.ModalLabel> 내용:</s.ModalLabel>
              <Input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </s.FlexContainer>
            <s.FlexContainer>
              <s.ModalLabel>시작일:</s.ModalLabel>
              <DateInput
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </s.FlexContainer>
            <s.FlexContainer>
              <s.ModalLabel>마감일:</s.ModalLabel>
              <DateInput
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </s.FlexContainer>
            <s.CheckButton type="submit">추가</s.CheckButton>
            <s.CancelButton onClick={() => setModalIsOpen(false)}>
              취소
            </s.CancelButton>
          </form>
        </s.AddBtnContainer>
      </s.AddBtnModal>
    </>
  );
};

export default AddBtn;
