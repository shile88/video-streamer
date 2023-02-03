import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import StreamCreate from "./components/StreamCreate";
import StreamDelete from "./components/StreamDelete";
import StreamEdit from "./components/StreamEdit";
import StreamList from "./components/StreamList";
import StreamShow from "./components/StreamShow";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<StreamList />} />
          <Route exact path="/streams/new" element={<StreamCreate />} />
          <Route exact path="/streams/edit/:id" element={<StreamEdit />} />
          <Route exact path="/streams/delete/:id" element={<StreamDelete />} />
          <Route exact path="/streams/:id" element={<StreamShow />} />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
