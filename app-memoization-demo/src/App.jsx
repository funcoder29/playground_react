import "./App.css";
import { Routes, Route } from "react-router";
import { Home } from "./components/Home";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
