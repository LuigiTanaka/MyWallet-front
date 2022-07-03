import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import styled from "styled-components";

export default function Cadastro() {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const [carregando, setCarregando] = useState(false);

    function fazerCadastro(event) {
        event.preventDefault();

        setCarregando(true);

        const body = {
            name: nome,
            email: email,
            password: senha
        }

        if(senha === confirmaSenha) {
            const promise = axios.post("http://localhost:5000/sign-up", body);

            promise
                .then(res => {
                    navigate("/");
                }).catch((err) => {
                    alert(err.response.data);
                    limparCampos();
                    setCarregando(false);
                })
        } else {
            alert("Senha distintas, preencha novamente os campos correspondentes!");
            setSenha('');
            setConfirmaSenha('');
            setCarregando(false);
        }
    }

    function irLogin() {
        navigate("/");
    }

    function limparCampos() {
        setEmail('');
        setSenha('');
        setNome('');
        setConfirmaSenha('');
    }

    function criarFormulario() {
        if (!carregando) {
            return (
                <>
                    <Input type="name" placeholder="Nome" onChange={(e) => setNome(e.target.value)} value={nome} required />
                    <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <Input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} value={senha} required />
                    <Input type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmaSenha(e.target.value)} value={confirmaSenha} required />
                    <Button type="submit">Cadastrar</Button>
                </>
            )
        } else {
            return (
                <>
                    <Input type="name" placeholder="Nome" onChange={(e) => setNome(e.target.value)} value={nome} required disabled={true} />
                    <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} required disabled={true} />
                    <Input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} value={senha} required disabled={true} />
                    <Input type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmaSenha(e.target.value)} value={confirmaSenha} required disabled={true} />
                    <Button type="submit" disabled={true}><ThreeDots height={70} width={70} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    const formularioCadastro = criarFormulario();

    return (
        <Container>
            <h1>MyWallet</h1>
            <form onSubmit={fazerCadastro}>{formularioCadastro}</form>
            <h6 onClick={irLogin}>Já tem uma conta? Entre agora!</h6>
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