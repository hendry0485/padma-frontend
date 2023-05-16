import { Container } from "react-bootstrap";
import { styled } from "styled-components";

const TitleBox = styled.div`
    background-color: white;
    border-radius: 5px;
    margin-bottom:20px;
    margin-top:40px;
    border-radius:3px;
    color:#263238;
    background:transparent;
`;

const PageTitle = ({ children }) => {
  return (
    <TitleBox>
        <Container>
            <div className="fs-3">{children}</div>
        </Container>
    </TitleBox>
  )
}

export default PageTitle;
