import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./Pages/Home";
import { News } from "./Pages/News";
import { ReactElement } from "react";

function App():ReactElement {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="news/:id" element={<News />} />
      </Routes>
    </div>
  );
}

export default App;
