import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

import Registro from "./Registro";

export default function Registros() {
    const { usuario, setUsuario, listaDeRegistros, setListaDeRegistros } = useContext(UserContext);

    const navigate = useNavigate();
    const saldo = calculaSaldo(listaDeRegistros);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promise = axios.get("http://localhost:5000/registros", config);

        promise.then(res => {
            if (res.data.length !== 0) {
                const newListaDeRegistros = res.data
                setListaDeRegistros(newListaDeRegistros);
            }
        });
    }, []);

    function calculaSaldo(listaDeRegistros) {
        let somaEntradas = 0;
        let somaSaidas = 0;
        listaDeRegistros.forEach((registro) => {
            if (registro.type === "entrada") {
                somaEntradas += parseFloat(registro.value.replace(",", "."));
            } else if (registro.type === "saida") {
                somaSaidas += parseFloat(registro.value.replace(",", "."));
            }
        });

        return (somaEntradas - somaSaidas).toFixed(2).replace(".", ",");
    }

    function sair() {
        if (window.confirm("Você realmente deseja sair?")) {
            setUsuario({});
            navigate("/");
        }
    }

    function renderizarRegistros() {
        return (
            listaDeRegistros.map((registro, index) => <Registro key={index} titulo={registro.title} valor={registro.value} tipo={registro.type} diaMes={registro.day} />)
        );
    }

    function renderizarLocalRegistros() {
        if (listaDeRegistros.length === 0) {
            return (
                <p>
                    Não há registros de
                    entrada ou saída
                </p>
            );
        } else {
            return (
                <>
                    <Registrados>
                        {registros}
                    </Registrados>
                    <Saldo saldo={saldo}>
                        <h5>Saldo</h5>
                        <h6>{saldo}</h6>
                    </Saldo>
                </>
            );
        }
    }

    const registros = renderizarRegistros();
    const localRegistros = renderizarLocalRegistros();

    return (
        <Container>
            <Topo>
                <h2>Olá, {usuario.name}</h2>
                <ion-icon onClick={sair} name="log-out-outline"></ion-icon>
            </Topo>
            <LocalRegistros>
                {localRegistros}
            </LocalRegistros>
            <Botoes>
                <Botao onClick={() => navigate("/entrada")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h3>Nova</h3>
                    <h3>entrada</h3>
                </Botao>
                <Botao onClick={() => navigate("/saida")}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <h3>Nova</h3>
                    <h3>saida</h3>
                </Botao>
            </Botoes>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    height: fit-content;
    background-color: #9157BE;
    padding: 0px 24px 130px 24px;
`

const Topo = styled.div`
    width: 326px;
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    position: fixed;
    top: 0;

    h2 {
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }

    ion-icon {
        font-size: 30px;
        color: #FFFFFF;
    }
`

const Botoes = styled.div`
    display: flex;
    justify-content: space-between;
    width: 326px;
    height: 114px;
    margin-top: 13px;
    position: absolute;
    bottom: 16px;
`

const Botao = styled.div`
    width: 155px;
    height: 114px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: #A328D6;
    border-radius: 5px;

    ion-icon {
        font-size: 22px;
        color: #FFFFFF;
        margin-bottom: 33px;
    }

    h3 {
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
`

const LocalRegistros = styled.div`
    width: 326px;
    height: calc(100vh - 220px);
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 24px 12px 10px 12px;
    margin-top: 78px;
    position: relative;

    p {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        align-self: center;
        text-align: center;
        margin-top: 50%;
        width: 200px;
        color: #868686;
    }
`

const Registrados = styled.div`
    margin-bottom: 35px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
    display: none;
    }
`

const Saldo = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;

    h5 {
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }

    h6 {
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: ${props => parseFloat(props.saldo) >= 0 ? "#03AC00" : "#C70000"};
    }
`