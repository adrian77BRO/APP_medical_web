import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { ProtectedRoutes } from './pages/ProtectedRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path='*' element={<h1>Not Founded</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
