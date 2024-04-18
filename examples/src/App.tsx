import './init';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './layout';
import './sass/index.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
