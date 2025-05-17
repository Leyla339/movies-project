import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import FavList from "./pages/FavList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/fav-list" element={<FavList />}></Route>
      </Routes>
    </>
  );
}

export default App;
