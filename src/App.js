import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

import RouteTest from "./components/RouteTest";
import MyHeader from "./components/MyHeader";
import MyButton from "./components/MyButton";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouteTest />
        <div>
          <MyButton />
          <MyButton status={"positive"} text={"MyButton(positive)"} onClick={() => console.log("MyButton(positive)")} />
          <MyButton status={"negative"} text={"MyButton(negative)"} onClick={() => console.log("MyButton(negative)")} />
        </div>
        <div>
          <MyHeader />
          <MyHeader
            headText={"TestHeader"}
            leftChild={<MyButton text={"leftChild"} onClick={() => console.log("leftChild")} />}
            rightChild={<MyButton text={"rightChild"} onClick={() => console.log("rightChild")} />}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
