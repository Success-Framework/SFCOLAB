import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<Home />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
