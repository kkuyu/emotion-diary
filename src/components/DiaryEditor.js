import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";

const emotionList = [
  { id: 1, src: "/assets/emotion1.png", text: "매우 좋음" },
  { id: 2, src: "/assets/emotion2.png", text: "좋음" },
  { id: 3, src: "/assets/emotion3.png", text: "보통" },
  { id: 4, src: "/assets/emotion4.png", text: "나쁨" },
  { id: 5, src: "/assets/emotion5.png", text: "매우 나쁨" },
];

const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(1);
  const [content, setContent] = useState("");

  const contentRef = useRef();

  const goBack = () => navigate(-1);
  const handleSubmit = () => {
    if (!content.length) {
      contentRef.current.focus();
      return;
    }

    if (isEdit && window.confirm("일기를 수정하시겠습니까?")) {
      onEdit(originData.id, content, emotion, date);
      navigate("/", { replace: true });
    }

    if (!isEdit && window.confirm("일기를 저장하시겠습니까?")) {
      onCreate(content, emotion, date);
      navigate("/", { replace: true });
    }
  };

  const handleClickEmotion = (targetId) => {
    setEmotion(targetId);
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <section>
        <h4>날짜</h4>
        <div className="input_box">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input_date" />
        </div>
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((item) => {
            return <EmotionItem key={item.id} {...item} isSelected={item.id === emotion} onClick={handleClickEmotion} />;
          })}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input_box text_wrapper">
          <textarea ref={contentRef} placeholder="" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
      </section>
      <div className="control_box">
        <MyButton text={"취소"} onClick={goBack} />
        <MyButton text={"저장"} type={"submit"} status={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default DiaryEditor;
