import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import JSONFormatterPage from "./pages/JSONFormatterPage";
import NotFoundPage from "./pages/NotFoundPage";
import CharacterCounterPage from "./pages/CharacterCounterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/json-formatter" element={<JSONFormatterPage />} />
        <Route path="/character-counter" element={<CharacterCounterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
