import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Diary = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goEdit = () => navigate(`/edit/${id}`);

  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState();
  const [date, setDate] = useState("");
  const [emotion, setEmotion] = useState(emotionList[2]);

  useEffect(() => {
    if (!diaryList.length) {
      navigate("/", { replace: true });
      return;
    }

    const targetData = diaryList.find((item) => parseInt(item.id) === parseInt(id));

    if (targetData) {
      setData({ ...targetData });
      setDate(getStringDate(new Date(targetData.date)));
      setEmotion(emotionList.find((item) => item.id === targetData.emotion));
    } else {
      navigate("/", { replace: true });
    }
  }, [id, diaryList]);

  return (
    <div>
      <MyHeader
        headText={`${date} 기록`}
        leftChild={<MyButton text={"뒤로가기"} isHidden={true} customClass={"headerLeft"} onClick={goBack} />}
        rightChild={<MyButton text={"수정"} onClick={goEdit} />}
      />
      {!data ? (
        <article className="DiaryPage">로딩중</article>
      ) : (
        <article className="DiaryPage">
          <section>
            <h4>감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${emotion.id}`].join(" ")}>
              <img src={emotion.src} alt="" />
              <span className="emotion_descript">{emotion.text}</span>
            </div>
          </section>
          <section>
            <h4>일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      )}
    </div>
  );
};

export default Diary;
