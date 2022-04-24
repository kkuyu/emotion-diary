import { useContext, useEffect, useState } from "react";

import { DiaryStateContext } from "../App";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const headText = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  useEffect(() => {
    if (!diaryList.length) {
      return;
    }

    const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
    const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getTime();

    setData(
      diaryList.filter((item) => {
        return minDate <= item.date && maxDate >= item.date;
      })
    );
  }, [diaryList, currentDate]);

  const increaseMonth = () => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    setCurrentDate(targetDate);
  };

  const decreaseMonth = () => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    setCurrentDate(targetDate);
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"이전월"} isHidden={true} customClass={"headerLeft"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={"다음월"} isHidden={true} customClass={"headerRight"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
