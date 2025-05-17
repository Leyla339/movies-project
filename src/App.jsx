import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import FavList from "./pages/FavList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/movies-project/" element={<Home />}></Route>
        <Route path="/movies-project/fav-list" element={<FavList />}></Route>
      </Routes>
    </>
  );
}

export default App;
