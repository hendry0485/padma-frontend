import { styled } from "styled-components";

const ContainerBox = styled.div`
    border-radius: 10px;
    margin-bottom:16px;
    border:none;
    min-height:25vw;
    padding:0px;

    box-shadow: 5px 5px 5px 0px rgba(14, 103, 32,0.5);
    // box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.5);

    background:${(props=>(props.variant == 'dark' ? "black" : 'white'))};
    color:${(props=>(props.variant == 'dark' ? "white" : 'inherit'))};

    @media (min-width:768px) {
        margin-bottom:16px;

    }

    @media (max-width:500px) {
        margin-bottom:16px;
        min-height:25vw;
    }
`;

const PortletNoPadding = (props) => {
  console.log(props);
  return (
    <ContainerBox>
        {props.children}
    </ContainerBox>
  )
}

export default PortletNoPadding;
