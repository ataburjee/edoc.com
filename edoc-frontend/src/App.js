import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home.jsx';
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:userId" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
