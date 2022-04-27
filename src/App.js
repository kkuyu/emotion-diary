import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return [...action.data];
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "EDIT": {
      newState = state.map((item) => {
        return item.id === action.data.id ? { ...action.data } : item;
      });
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    default: {
      return state;
    }
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const onCreate = (content, emotion, date) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        content,
        emotion,
        date: new Date(date).getTime(),
      },
    });
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, content, emotion, date) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        content,
        emotion,
        date: new Date(date).getTime(),
      },
    });
  };

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const localList = JSON.parse(localData);
      if (!localList.length) return;

      localList.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(localList[0].id + 1);
      dispatch({ type: "INIT", data: localList });
    }
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
