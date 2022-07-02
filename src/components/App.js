import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Entrada from "./Entrada";
import Saida from "./Saida";
import Registros from "./Registros";

export default function App() {

    const [usuario, setUsuario] = useState(
        {
            name: "luigi",
            email: "luigi@gmail.com",
            password: "luigi123"
        }
    );
    const [listaDeRegistros, setListaDeRegistros] = useState([]);

    const contextValue = { usuario, setUsuario, listaDeRegistros, setListaDeRegistros };

    return (
        <UserContext.Provider value={contextValue}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/registros" element={<Registros />} />
                    <Route path="/entrada" element={<Entrada />} />
                    <Route path="/saida" element={<Saida />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}