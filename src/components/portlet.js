import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const ContainerBox = styled.div`
    background-color: white;
    border-radius: 5px;
    margin-bottom:30px;
    border-radius:3px;
    border:1px solid #eee;

    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);

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
