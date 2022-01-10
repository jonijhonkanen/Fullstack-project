import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Navigation bar
import Navigation from './Navigation';
//Two main views
import AdminView from './AdminView';
import StudentView from './StudentView';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navigation />
        </header>
        <div className="content">
          <Routes>
            <Route path="/" exact element={<AdminView />} />
            <Route path="student/*" element={<StudentView />} />
            <Route path="*" element={<h1>Error with page url!</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
