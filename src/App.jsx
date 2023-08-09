import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
const App = () => {
  return (
    <div className="pages">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
