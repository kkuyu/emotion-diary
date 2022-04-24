import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ControlMenu from "./ControlMenu";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "등록순" },
];

const filterOptionList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은날" },
  { value: "bad", name: "나쁜날" },
];

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filterList = copyList.filter((item) => {
      if (filter === "good") return parseInt(item.emotion) <= 3;
      if (filter === "bad") return parseInt(item.emotion) > 3;
      return true;
    });
    const sortedList = filterList.sort((a, b) => {
      if (sortType === "latest") return parseInt(b.date) - parseInt(a.date);
      return parseInt(a.date) - parseInt(b.date);
    });
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} optionList={sortOptionList} onChange={setSortType} />
          <ControlMenu value={filter} optionList={filterOptionList} onChange={setFilter} />
        </div>
        <div className="right_col">
          <MyButton text={"새 일기"} status={"positive"} onClick={() => navigate("/new")} />
        </div>
      </div>
      {getProcessedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
