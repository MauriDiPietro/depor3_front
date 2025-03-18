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
import { DraftsDetail } from "./pages/DraftDetail/draft-detail";
import { PatioDetail } from "./pages/PatioDetail/patio-detail";
import { About } from "./pages/QuienesSomos";

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
            element={<Navigate to="/patio/67951df99130785a0c518e03" replace />}
          />
          <Route
            path="/deportistas_ivanna-madruga"
            element={<Navigate to="/patio/67951daf9130785a0c518e02" replace />}
          />
          <Route
            path="/deportistas_caco-colla"
            element={<Navigate to="/patio/67951d829130785a0c518e00" replace />}
          />
          <Route
            path="/deportistas_piojo-lopez"
            element={<Navigate to="/patio/67951d9c9130785a0c518e01" replace />}
          />
          <Route
            path="/deportistas_curita-peralta"
            element={<Navigate to="/patio/67951d5b9130785a0c518dff" replace />}
          />
          <Route
            path="/nuestro-gen-dominante"
            element={<Navigate to="/patio/679d4d00defad880b9ece1b6" replace />}
          />
          <Route
            path="/deportistas_andrea-berrino"
            element={<Navigate to="/patio/67b094f94327ddfef1f3c85b" replace />}
          />
          <Route
            path="/deportistas_gusti-fernandez"
            element={<Navigate to="/patio/67b0972c09ea7a8ef50b99ea" replace />}
          />
          <Route
            path="/deportistas_oscar-galindez"
            element={<Navigate to="/patio/67b094d0cfdbed00563833dd" replace />}
          />
          <Route
            path="/deportistas_marcelo-mario-milanesio"
            element={<Navigate to="/patio/67b0949f4327ddfef1f3c852" replace />}
          />
          <Route
            path="/deportistas_pechito-lopez"
            element={<Navigate to="/patio/67b0943b09ea7a8ef50b99d4" replace />}
          />
          <Route
            path="/deportistas_gustavo-fernandez"
            element={<Navigate to="/patio/67b092504327ddfef1f3c845" replace />}
          />
          <Route
            path="/deportistas_alfredo-altamirano"
            element={<Navigate to="/patio/67b08def09ea7a8ef50b99a4" replace />}
          />
          <Route
            path="/deportistas_juan-manuel-fernandez"
            element={<Navigate to="/patio/67b08fa009ea7a8ef50b99b9" replace />}
          />
          <Route
            path="/deportistas_rocio-comba"
            element={<Navigate to="/patio/67a8801c22908d6c35011f94" replace />}
          />
          <Route
            path="/deportistas_gustavo-pascutti"
            element={<Navigate to="/patio/67ab67b31558b59f0defec8d" replace />}
          />
          <Route
            path="/deportistas_pablo-prigioni"
            element={<Navigate to="/patio/67a7ef77597cc850b2aac840" replace />}
          />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/draft/:id" element={<DraftsDetail />} />
          <Route path="/patio/:id" element={<PatioDetail />} />
          <Route path="/entrevistas" element={<Entrevistas />} />
          <Route path="/patio-del-deportista" element={<Patio />} />
          <Route path="/historias-gen-dominante" element={<Historias />} />
          <Route path="/about" element={<About />} />
        </Route>
        {/* - */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </HelmetProvider>
  );
};
