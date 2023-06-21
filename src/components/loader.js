import { styled } from "styled-components";

const LoaderLayer = styled.div`
    height:100vh;
    width:100vw;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:white;
    z-index:99;
`

export default function Loader(props) {
  return (
    <LoaderLayer>
        {props.text}
    </LoaderLayer>
  )
}
