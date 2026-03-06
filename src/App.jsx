import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Channels from "./pages/Channels";
import Watch from "./pages/Watch";
import Radio from "./pages/Radio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Channels list page */}
        <Route path="/channels" element={<Channels />} />

        {/* Radio Page */}
        <Route path="/radios" element={<Radio />} />

        {/* Watch page (TV ) */}
        <Route path="/watch/:slug" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;