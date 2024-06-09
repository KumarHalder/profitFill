import React from 'react';
import './App.css';

import AppBarCustom from "./components/AppBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Update from "./components/UpdateComponents";
import Delete from "./components/DeleteComponent";
import Search from "./components/SearchComponent";
import Home from "./components/Home";
import Create from "./components/CreateComponent";
import {SnackbarProvider} from "./context/SnackbarContext";


function App() {


  return (
      <>
          <BrowserRouter>
              <AppBarCustom/>
              <SnackbarProvider>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/job/:jobId" element={<Search />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/update" element={<Update />} />
                  <Route path="/delete" element={<Delete />} />
              </Routes>
              </SnackbarProvider>
          </BrowserRouter>
      </>

  );
}









export default App;
