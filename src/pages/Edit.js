import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Edit = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  const [originData, setOriginDate] = useState();

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
      <MyHeader headText={"일기 수정"} leftChild={<MyButton text={"뒤로가기"} isHidden={true} customClass={"headerLeft"} onClick={goBack} />} />
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
