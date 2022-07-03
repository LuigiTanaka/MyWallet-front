import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Login() {
    const { setUsuario } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [carregando, setCarregando] = useState(false);

    function fazerLogin(event) {
        event.preventDefault();

        setCarregando(true);

        const body = {
            email: email,
            password: senha
        }

        const promise = axios.post("https://back-mywallet-luigi.herokuapp.com/sign-in", body);

        promise
            .then(res => {
                setUsuario(res.data);
                navigate("/registros");
            }).catch((err) => {
                alert(err.response.data);
                limparCampos();
                setCarregando(false);
            })

    }

    function limparCampos() {
        setEmail('');
        setSenha('');
    }

    function criarFormulario() {
        if (!carregando) {
            return (
                <>
                    <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <Input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} value={senha} required />
                    <Button type="submit">Entrar</Button>
                </>
            )
        } else {
            return (
                <>
                    <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} required disabled={true} />
                    <Input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} value={senha} required disabled={true} />
                    <Button type="submit" disabled={true}><ThreeDots height={70} width={70} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    const formularioLogin = criarFormulario();

    return (
        <Container>
            <h1>MyWallet</h1>
            <form onSubmit={fazerLogin}>
                {formularioLogin}
            </form>
            <h6 onClick={() => navigate("/cadastro")}>Primeira vez? Cadastre-se!</h6>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background-color: #9157BE;
    h1 {
        font-family: 'Saira Stencil One';
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    h6 {
        margin-top: 36px;
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        text-align: center;
        color: #FFFFFF;
    }
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