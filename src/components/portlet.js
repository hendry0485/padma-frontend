import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const ContainerBox = styled.div`
    background-color: white;
    border-radius: 5px;
    margin:16px;
    border:1px solid #eee;
    min-height:25dvw;
    
    // lestar
    box-shadow: 5px 5px 5px 0px rgba(14, 103, 32,0.5);
    // abadi
    box-shadow: 5px 5px 5px 0px rgba(70, 143, 184,0.5);
    // sejati
    box-shadow: 5px 5px 5px 0px rgba(162, 36, 37,0.5);

    background:${(props=>(props.variant == 'dark' ? "#263238" : 'white'))};
    color:${(props=>(props.variant == 'dark' ? "white" : 'inherit'))};
    

    @media (min-width:768px) {
        padding:0 16px 16px 16px;
        margin-bottom:16px;

    }

    @media (max-width:500px) {
        padding:0 8px 16px 8px;
        margin-bottom:16px;
        min-height:25dvw;
    }
`;

const Portlet = ({ children }) => {
  return (
    <ContainerBox>
        <Container>
            {children}
        </Container>
    </ContainerBox>
  )
}

export default Portlet;
