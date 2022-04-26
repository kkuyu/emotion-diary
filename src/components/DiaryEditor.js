import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";

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
