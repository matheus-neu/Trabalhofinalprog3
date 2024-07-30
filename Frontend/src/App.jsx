import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cadastro from './cadastro';
import Login from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Principal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/principal' element={<Principal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
