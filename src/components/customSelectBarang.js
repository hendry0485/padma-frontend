import { useState } from "react"
import { FloatingLabel, Form, ListGroup, InputGroup } from "react-bootstrap"
import { styled } from "styled-components"
import { FcCheckmark } from "react-icons/fc";
import { useEffect } from "react";

const DropdownBox = styled.div`
    width:100%;
    max-height:300px;
    overflow-y:scroll;
    position:absolute;
    top:53px;
    left:0;
    padding:5px;
    background:white;
    border:1px solid #ddd;
    border-top:none;
    z-index:3;
`


export default function CustomSelectBarang(props) {

    const isReadonly = (props.readonly ? true : false);
    const [filteredData, setFilteredData] = useState(props.itemList);
    const [textFilter, setTextFilter] = useState(props.initialValue.nama ? props.initialValue.nama : '');
    const [toggle, setToggle] = useState(false);
    const [inList, setInList] = useState(false);
    const [selected, setSelected] = useState(props.initialValue);

    const clickItem = (target, data_id) => {
        const selected = props.itemList.filter((item)=>item.id == data_id);
        const id = selected[0].id;
        const text = selected[0].nama;
        setSelected(selected[0]);
        props.setSelected(selected[0]);
        setToggle(false);
        setInList(true);
    }

    const enterInput = (key) =>{
        if (key === "Enter" && textFilter.length > 0 && filteredData.length > 0) {
            const selected = filteredData[0];
            const id = selected.id;
            const text = selected.nama;
            setSelected(selected);
            props.setSelected(selected);
            setToggle(false);
            setInList(true);
        }else{
            if (key === 'Escape') {
                setToggle(false);
            }
            setInList(false);
        }
    }

    const checkBlur = (target) => {
        setToggle(false);
    }

    const listStyle = {
        cursor:"pointer",
        "&:hover": {
            backgroundColor: "#eee"
        }
    }
    
    const filterData = (text) =>{
        const nList = (text.length > 0 ? props.itemList.filter(list=>list.nama.toString().toLowerCase().includes(textFilter.toLowerCase())): props.itemList );
        // props.setSelected({});
        setTextFilter(text);
        setFilteredData(nList);

    }

    useEffect(() => {
      if (toggle) {
        setTextFilter('');
        if(!isReadonly)
            document.querySelector("#inputFilter").focus();
        filterData('');
      }
    }, [toggle])
    

    return (
        <>
            <div tabIndex="0" style={{position:"relative"}} 
            onBlur={(e)=>checkBlur(e.target)}>
                <InputGroup className="mb-3">
                    <FloatingLabel label={props.label}>
                        <Form.Control
                            data-class='cs-inp-f'
                            onClick={()=>setToggle(true)}
                            value={(selected.nama ? selected.nama : '')}
                            readOnly
                        />
                    </FloatingLabel>
                    {
                        selected.nama  && <InputGroup.Text ><FcCheckmark/></InputGroup.Text>
                    }
                </InputGroup>
                {
                    (toggle && !isReadonly )  &&
                        <DropdownBox>
                            <div
                            className="py-2 px-1">
                                <Form.Control
                                    data-class='cs-inp-f'
                                    onChange={(e)=>filterData(e.target.value)}  
                                    onKeyDown={(e)=>enterInput(e.key)} 
                                    onFocus={()=>setToggle(true)}
                                    value={textFilter}
                                    id="inputFilter"
                                />
                            </div>
                            <ListGroup>
                                {filteredData.map((data, index)=>{
                                    return(
                                        <ListGroup.Item data-class='cs-inp-f' style={listStyle} onMouseDown={(e)=>clickItem(e.target, data.id)} key={index} data-value={data.id}>{data.nama}</ListGroup.Item>
                                    )
                                })}

                            </ListGroup>
                        </DropdownBox>
                }
            </div>
        </>
    )
}
