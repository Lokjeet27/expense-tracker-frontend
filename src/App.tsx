import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';  // ✅ Make sure the import path is correct
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
