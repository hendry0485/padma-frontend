import { styled } from "styled-components"
import { FaTimes } from 'react-icons/fa';


const NumhelpWrapper = styled.div`
    padding:10px;
    position:fixed;
    top:30vh;
    right:0;
`;

const Tuts = styled.button`
    width:55px;
    height:55px;
    padding:12px 2px 6px 2px;
    border:2px solid #eee;
    border-bottom:4px solid #eee;
    color:#707070;
    background:white;
    border-radius:27.5px;
    margin:4px 2px 12px 2px;
    text-align:center;
    box-shadow: 2px 5px #ccc;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`;

const ClosedTuts = styled.button`
    width:25px;
    height:25px;
    position:absolute;
    right:10px;
    top:10px;
    background:#ddd;
    border:none;
    // background:red;
    border:1px solid white;
    border-radius:12.5px;
    font-size:12px;
    
    &:hover {
        background:red;
    }
`

export default function Numhelp(props) {
    return (
        <>

            <NumhelpWrapper>
                <ClosedTuts onClick={props.handleClose}><FaTimes/></ClosedTuts>
                <Tuts onClick={()=>props.returnVal(100)} >100</Tuts>
            </NumhelpWrapper>
        </>
    )
}
