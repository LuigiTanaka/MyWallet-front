import styled from "styled-components";

export default function Registro({ titulo, valor, tipo, diaMes }) {

    return (
        <Container>
            <DiaTitulo>
                <h2>{diaMes}</h2>
                <h3>{titulo}</h3>
            </DiaTitulo>
            <Valor tipo={tipo}>{valor}</Valor>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    margin-bottom: 10px;
`

const DiaTitulo = styled.div`
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    width: 215px;

    h2{
        color: #C6C6C6; 
        margin-right: 12px;
    }

    h3 {
        color: #000000;
        word-break: break-word;
    }   
`

const Valor = styled.div`
    width: 80px;
    display: flex;
    justify-content: end;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${props => props.tipo === "entrada" ? "#03AC00" : "#C70000"};
    word-break: break-all;
    margin-left: 5px;
`