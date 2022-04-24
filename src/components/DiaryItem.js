import { Link, useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const dateStr = new Date(parseInt(date)).toLocaleDateString();

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <Link to={`/diary/${id}`} className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
        <img src={`/assets/emotion${emotion}.png`} alt="" />
      </Link>
      <Link to={`/diary/${id}`} className="info_wrapper">
        <div className="diary_date">{dateStr}</div>
        <div className="diary_content_preview">{content}</div>
      </Link>
      <div className="btn_wrapper">
        <MyButton text={"수정"} onClick={goEdit} />
      </div>
    </div>
  );
};

DiaryItem.defaultProps = {
  diaryItem: [],
};

export default DiaryItem;
