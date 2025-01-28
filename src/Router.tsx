import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouterLayout } from "./shared/RouterLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NewsDetail } from "./pages/NewDetail/new-detail";
import Entrevistas from "./pages/Entrevistas";
import { Patio } from "./pages/Patio";
import { Historias } from "./pages/Historias";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      {/* rutas con navbar */}
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<Home />} />
        {/* Redirecciones */}
        <Route
          path="/deportistas_piojo-lopez"
          element={<Navigate to="/news/67951d9c9130785a0c518e01" replace />}
        />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/entrevistas" element={<Entrevistas />} />
        <Route path="/patio-del-deportista" element={<Patio />} />
        <Route path="/historias-gen-dominante" element={<Historias />} />
      </Route>
      {/* - */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
