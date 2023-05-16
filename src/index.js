import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "modern-normalize";
import "./stylesheet/main.css";
import "./stylesheet/quanyuan.css";


import DefaultLayout from "./layouts/Default";
import Home from "./routes/Home";
import Article from "./routes/Article";
import ArticleCat from "./routes/ArticleCat";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";


render(
  <React.StrictMode>
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/:slug" element={<ArticleCat />} />
          <Route path="/blog/:id" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
