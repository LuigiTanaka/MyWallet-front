import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Entrada() {
    const { usuario } = useContext(UserContext);

    const navigate = useNavigate();

    const [valor, setValor] = useState('');
    const [titulo, setTitulo] = useState('');

    const [carregando, setCarregando] = useState(false);

    function cadastrarSaida(event) {
        event.preventDefault();

        setCarregando(true);

        const body = {
            title: titulo,
            value: valor,
            type: "saida"
        }

        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promise = axios.post("http://localhost:5000/registros", body, config);

        promise
            .then(res => {
                navigate("/registros");
            }).catch((err) => {
                alert("Dados inválidos, preencha os campos novamente");
                limparCampos();
                setCarregando(false);
            })
    }

    function limparCampos() {
        setValor('');
        setTitulo('');
    }

    function criarFormulario() {
        if (!carregando) {
            return (
                <>
                    <Input type="text" placeholder="Valor" onChange={(e) => setValor(e.target.value)} value={valor} required />
                    <Input type="text" placeholder="Descrição" onChange={(e) => setTitulo(e.target.value)} value={titulo} required />
                    <Button type="submit">Salvar saida</Button>
                </>
            )
        } else {
            return (
                <>
                    <Input type="text" placeholder="Valor" onChange={(e) => setValor(e.target.value)} value={valor} required disabled={true} />
                    <Input type="text" placeholder="Descrição" onChange={(e) => setTitulo(e.target.value)} value={titulo} required disabled={true} />
                    <Button type="submit" disabled={true}><ThreeDots height={70} width={70} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    const formularioSaida = criarFormulario();

    return (
        <Container>
            <Topo>Nova saida</Topo>
            <form onSubmit={cadastrarSaida}>
                {formularioSaida}
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background-color: #9157BE;
    form {
        display: flex;
        flex-direction: column;
    }
`

const Topo = styled.div`
    width: 326px;
    height: 78px;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom: 15px;
`

const Input = styled.input`
    width: 326px;
    height: 58px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 11px;
    font-size: 20px;
    margin-bottom: 13px;
    font-family: 'Raleway', sans-serif;
    &::placeholder {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #CACACA;
    }
    &:disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
    }
`

const Button = styled.button`
    width: 326px;
    height: 46px;
    border-radius: 5px;
    border: none;
    font-weight: 600;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #FFFFFF;
    background-color: #A328D6;
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled {
        opacity: 0.7;
    }
`