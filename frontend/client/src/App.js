import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from "./Pages/Dashboard/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateMemes from "./Pages/CreateMemes/CreateMemes";
import ReadMemes from "./Pages/ReadMemes/ReadMemes"
import EditDashboard from "./Pages/EditDashboard/EditDashboard";
import Memespage from "./Pages/Memespage/Memespage";
import GetOneMeme from "./Pages/getoneMeme/getoneMeme";
import Registration from "./Pages/Registration/Registration"

import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/create" element={<CreateMemes/>}/>
        <Route path="/read/:id" element={<ReadMemes/>}/>
        <Route path="/edit/:id" element={<EditDashboard/>}/>
        <Route path="/memespage" element={<Memespage/>}/>
        <Route path="/getOneMeme/:id" element={<GetOneMeme />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
