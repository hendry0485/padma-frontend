import { styled } from "styled-components"
import { useCustomNumpad } from '../customHooks/useCustomNumpad';
import { IoBackspace } from 'react-icons/io5'

const NumpadContainer = styled.div`
    width:100%;
    max-width:720px;
    height:320px;
    padding:10px;
    background-color:#ddd;
    position:fixed;
    z-index:999;
    bottom:0;
    left:0;
`;

const NumpadWrapper = styled.div`
    padding:10px;
    margin:auto;
    display:flex;
    flex-flow: row wrap-reverse;
    align-items:center;
    justify-content:space-around;
`;

const Tuts = styled.div`
    width:102px;
    height:55px;
    padding:12px 2px 6px 2px;
    border:2px solid white;
    border-bottom:4px solid white;
    color:#707070;
    background:white;
    border-radius:4px;
    margin:4px 2px 12px 2px;
    text-align:center;
    box-shadow: 2px 5px #ccc;
`;

export default function Numpad(props) {
    const del = (str) => {
        str = str.slice(0, -1);
        props.returnVal(str); 
    }
    return (
        <>
                <NumpadContainer>
                    <NumpadWrapper>
                        <Tuts onClick={()=>del(props.curVal)} key="del"><IoBackspace/></Tuts>
                        <Tuts onClick={()=>props.returnVal(props.curVal+'0')} key="0">0</Tuts>
                        <Tuts onClick={()=>props.returnVal(props.curVal+'0')} key=".">.</Tuts>
                        {
                            [...Array(9).keys()].map((num)=>{
                                return(
                                    <Tuts onClick={()=>props.returnVal(props.curVal+(num+1).toString())} key={num+1}>{num+1}</Tuts>
                                )
                            })
                        }
                                    
                    </NumpadWrapper>
                </NumpadContainer>
        </>
    )
}
