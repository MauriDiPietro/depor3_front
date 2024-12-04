import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterLayout } from "./shared/RouterLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const AppRouter: React.FC<{}> = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout/>} >
                <Route path="/" element={<Home/>} />
            </Route>
                <Route path="/login" element={<Login/>} />
        </Routes>
    )
}