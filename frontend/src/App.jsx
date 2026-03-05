import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Channels from "./pages/Channels";
import Watch from "./pages/Watch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Channels list page */}
        <Route path="/channels" element={<Channels />} />

        {/* Watch page (TV or Radio) */}
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;