import React, { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const dummyData = [
  {
    id: 0,
    emotion: 1,
    content: "220422 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    date: 1650585600000,
  },
  {
    id: 1,
    emotion: 2,
    content: "220423 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    date: 1650672000000,
  },
  {
    id: 2,
    emotion: 3,
    content: "220424 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    date: 1650758400000,
  },
  {
    id: 3,
    emotion: 4,
    content: "220425 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    date: 1650844800000,
  },
  {
    id: 4,
    emotion: 5,
    content: "220426 Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    date: 1650931200000,
  },
];

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      newState = [action.data];
      break;
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
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, [...dummyData]);

  const dataId = useRef(0);

  const onCreate = (content, emotion, date) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
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

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onRemove, onEdit)}>
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
