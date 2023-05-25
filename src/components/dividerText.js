import { styled } from "styled-components";

const Divider = styled.div`
    height:20px;
    font-size:0.8em;
    position:relative;
    text-align:center;
    background:white;
    margin:20px 0;

    &:before{
        content: " ";
        height:100%;
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        translate:0px -8px;
        border-bottom:1px solid #999;
    }
`;

const TextContent = styled.div`
    height:20px;
    background-color:white;
    position:relative;
    text-align:center;
    margin:auto;
    font-weight:bold;
    width:${props => (props.variant === 'l' ? '100px' : '60px')};
    `;

const DividerText = (props) => {
    return(
        <Divider>
            <TextContent variant={props.variant}>
                {props.children}
            </TextContent>
        </Divider>
    )
}

export default DividerText;