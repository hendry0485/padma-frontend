import { Container } from "react-bootstrap";
import { styled } from "styled-components";

const TitleBox = styled.div`
    border-radius: 5px;
    border-radius:3px;
    color:#263238;
    background:transparent;
    font-weight:600;
    color:white;
    position:relative; 
    text-align:center;
    height:10vh;
    display:flex;
    justify-content:center;
    align-items: center;
    
`;

const IconBox = styled.div`
  position:absolute;
  top:0px;
  right:20px;
  font-size:3em;
`;

const PageTitle = ({icon, children }) => {
  return (
    <TitleBox>
        <Container>
            <div>{children}</div>
        </Container>
    </TitleBox>
  )
}

export default PageTitle;
