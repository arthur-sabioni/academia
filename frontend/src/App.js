
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Plans from './pages/Plans/Plans';
import ContextProvider from './context/ContextProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/plans' element={<Plans />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
