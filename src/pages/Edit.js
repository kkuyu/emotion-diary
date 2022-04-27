import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiaryDispatchContext, DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Edit = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const { onRemove } = useContext(DiaryDispatchContext);

  const [originData, setOriginDate] = useState();

  const handleRemove = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const titleEl = document.getElementsByTagName("title")[0];
    titleEl.innerHTML = "감정 일기장 - 수정";
  });

  useEffect(() => {
    if (!diaryList.length) {
      navigate("/", { replace: true });
      return;
    }

    const targetData = diaryList.find((item) => {
      return parseInt(item.id) === parseInt(id);
    });
    if (targetData) {
      setOriginDate({ ...targetData });
    } else {
      navigate("/", { replace: true });
    }
  }, [id, diaryList]);

  return (
    <div>
      <MyHeader
        headText={"일기 수정"}
        leftChild={<MyButton text={"뒤로가기"} isHidden={true} customClass={"headerLeft"} onClick={goBack} />}
        rightChild={<MyButton text={"삭제"} status={"negative"} onClick={handleRemove} />}
      />
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
