
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import ContextProvider from './data/ContextProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/menu/:token' element={<Menu />} />
            <Route path='/:token' element={<Home />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
