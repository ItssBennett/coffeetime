import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feature from "./components/Feature";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Calendar from './components/Calendar';




function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Feature />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
