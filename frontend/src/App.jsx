import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Tarts from "./pages/Tarts.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/tarts" element={<Tarts/>}/>
    </Routes>
  );
}

export default App;