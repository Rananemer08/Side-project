import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
 
} from 'react-router-dom';
import Dashboard from "./Pages/Dashboard/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateMemes from "./Pages/CreateMemes/CreateMemes";
import ReadMemes from "./Pages/ReadMemes/ReadMemes"
import EditDashboard from "./Pages/EditDashboard/EditDashboard";
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/create" element={<CreateMemes/>}/>
        <Route path="/read/:id" element={<ReadMemes/>}/>
        <Route path="/edit/:id" element={<EditDashboard/>}/>
      </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
