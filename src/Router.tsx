import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouterLayout } from "./shared/RouterLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NewsDetail } from "./pages/NewDetail/new-detail";
import Entrevistas from "./pages/Entrevistas";
import { Patio } from "./pages/Patio";
import { Historias } from "./pages/Historias";
import { HelmetProvider } from "react-helmet-async";

export const AppRouter: React.FC<{}> = () => {
  return (
    <HelmetProvider>
      <Routes>
        {/* rutas con navbar */}
        <Route path="/" element={<RouterLayout />}>
          <Route path="/" element={<Home />} />
          {/* Redirecciones */}
          <Route
            path="/deportistas_miguel-marin"
            element={<Navigate to="/news/67951df99130785a0c518e03" replace />}
          />
          <Route
            path="/deportistas_ivanna-madruga"
            element={<Navigate to="/news/67951daf9130785a0c518e02" replace />}
          />
          <Route
            path="/deportistas_caco-colla"
            element={<Navigate to="/news/67951d829130785a0c518e00" replace />}
          />
          <Route
            path="/deportistas_piojo-lopez"
            element={<Navigate to="/news/67951d9c9130785a0c518e01" replace />}
          />
          <Route
            path="/deportistas_curita-peralta"
            element={<Navigate to="/news/67951d5b9130785a0c518dff" replace />}
          />
          <Route
            path="/nuestro-gen-dominante"
            element={<Navigate to="/news/679d4d00defad880b9ece1b6" replace />}
          />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/entrevistas" element={<Entrevistas />} />
          <Route path="/patio-del-deportista" element={<Patio />} />
          <Route path="/historias-gen-dominante" element={<Historias />} />
        </Route>
        {/* - */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </HelmetProvider>
  );
};
