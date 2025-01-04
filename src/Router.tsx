import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterLayout } from "./shared/RouterLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NewsDetail } from "./pages/NewDetail/new-detail";
import Entrevistas from "./pages/Entrevistas";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      {/* rutas con navbar */}
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/entrevistas" element={<Entrevistas/>} />
      </Route>
      {/* rutas con navbar */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
