import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryEditor from "./../components/DiaryEditor";

const New = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const titleEl = document.getElementsByTagName("title")[0];
    titleEl.innerHTML = "감정 일기장 - 작성";
  });

  return (
    <div>
      <MyHeader headText={"일기 작성"} leftChild={<MyButton text={"뒤로가기"} isHidden={true} customClass={"headerLeft"} onClick={goBack} />} />
      <DiaryEditor />
    </div>
  );
};

export default New;
