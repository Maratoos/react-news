import { Route, Routes } from "react-router-dom";
import { Header } from "./assets/components/Header/Header";
import { Home } from "./assets/Pages/Home";
import { News } from "./assets/Pages/News";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="news/:id" element={<News />}/>
      </Routes>
    </div>
  );
}

export default App;
