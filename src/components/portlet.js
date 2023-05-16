import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const ContainerBox = styled.div`
    background-color: white;
    border-radius: 5px;
    margin-bottom:30px;
    border-radius:3px;

    background:${(props=>(props.variant == 'dark' ? "#263238" : 'white'))};
    color:${(props=>(props.variant == 'dark' ? "white" : 'inherit'))};

    @media (min-width:768px) {
        padding:20px;
        margin:30px 20px;

    }

    @media (max-width:500px) {
        padding:20px 10px;
        margin:10px;
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
