// import { useState } from "react"

import { useState, useEffect, useRef } from "react";
import { Table, Button, Row, Col, Modal, CloseButton, Alert, Form} from "react-bootstrap";
import { BsBuilding } from 'react-icons/bs';
import { FaTimes, FaSave } from 'react-icons/fa';
import Portlet from "../../components/portlet";
import { styled } from "styled-components";
import CustomSelectBarang from "../../components/customSelectBarang";
import DividerText from "../../components/dividerText";
import { useCustomNumpad } from "../../customHooks/useCustomNumpad";
import Numpad from "../../components/numpad";



const CellInput = styled.input`
  width:100%;
  max-width:100px;
  padding:5px;
  height:30px;
  text-align:center;
`


export default function PenerimaanBarangBaru(props) {
  const [dataBarang, setDataBarang] = useState([{
    qty:0,
    roll:0
  }]);
  const [totalQty, setTotalQty] = useState(0)
  const [totalRoll, setTotalRoll] = useState(0)

  let initSelected = {};
  if (typeof props.dataBarang.barang_id !== 'undefined' && props.dataBarang.barang_id !== '') {
    initSelected = props.barangList.filter(barang=>barang.id == props.dataBarang.barang_id)[0];
  }
  const [barangSelected, setBarangSelected] = useState(initSelected);
  
  const [errorForm, setErrorForm] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [rowIndex, setRowIndex] = useState([0,'']);
  const [keyVal, setKeyVal] = useState("");
  const curVal = useRef('');

  const [showNumpad, setShowNumpad] = useState(false);
  
  const handleShowNumpad = () => {
    setShowNumpad(true);
  };
  
  const handleCloseNumpad = () => {
    setShowNumpad(false);
  }

  const getBarangSelected = (value) => {
    setBarangSelected(value)
    if (typeof value.id === 'undefined') {
      setErrorForm("Required");
    }else{
      setErrorForm("");
    }
  }

  const getKeyVal = (value) => {
    curVal.current = curVal.current + value;
    if (rowIndex[1] == 'qty') {
      editQty(rowIndex[0], curVal.current);
    }else if(rowIndex[1] == 'roll'){
      editRoll(rowIndex[0], curVal.current);
    }
  }

  const editQty = (index, value) =>{
    // console.log(index, value);
    const nList = [...dataBarang];
    nList[index].qty = value;
    const l = nList.length - 1 ;

    if (nList[l].qty != 0 ) {
      nList.push({
        qty:0,
        roll:0
      });
    }
    
    if (typeof barangSelected.id === 'undefined') {
      setErrorForm("Required");
    }

    setDataBarang(nList);
  }
  
  const initNumpad = (index, tipe) => {
    if(tipe == 'qty'){
      curVal.current = '';
    }
    setRowIndex([index, tipe]);
    handleShowNumpad();
    
  }

  const editRoll = (index, value) =>{
    const nList = [...dataBarang];
    nList[index].roll = value;
    setDataBarang(nList);
  }

  const nextInput = (key, index) => {
    if(key === "Enter" && index < (dataBarang.length*2)-1 ){
      const tbl = document.querySelector(`#data-table`);      
      tbl.querySelector(`[tabindex="${parseInt(index)+1}"]`).focus();     
    }
  }

  const cekRoll = (index) => {
    const nList = [...dataBarang];
    if(nList[index].roll == '' && nList[index].qty != '' && nList[index].qty != 0){
      nList[index].roll = 1;
    }else if(nList[index].qty == '' || nList[index].qty == 0){
      nList[index].roll = '';
    }else{
      return;
    }
    setDataBarang(nList);
  }

  const cekQty = (index) => {
    const nList = [...dataBarang];
    if(nList[index].qty == '' || nList[index].qty == 0){
      nList[index].roll = '';
    }

    setDataBarang(nList);    
  }

  const countTotal = () =>{
    
    let totalQtyNew = 0;
    let totalRollNew = 0;
    dataBarang.forEach(list => {
      if(list.qty != ''){
        totalRollNew += parseInt(list.roll);
        totalQtyNew += (list.qty * (list.roll == 0 ? 1 : list.roll));
      }
    });
    setTotalRoll(totalRollNew);
    setTotalQty(totalQtyNew);
  }

  
  

  const removeRow = (rIndex) => {
    const nList= dataBarang.filter((barang,index)=>index != rIndex);
    setDataBarang(nList);
  }

  useEffect(() => {
    countTotal();
  }, [dataBarang]);

  const wrapData = () => {
    setIsLocked(true);
    const bs = barangSelected;
    const nList = [];
    dataBarang.forEach((barang, index) => {
      nList.push({
        nama:bs.nama,
        barang_id:bs.id,
        barang_nama:bs.nama,
        warna_id:bs.warna_id,
        warna_nama:bs.warna_nama,
        qty:barang.qty,
        roll:barang.roll,
      })
    });

  }
  

  return (
    <>
      <Modal show={true} fullscreen={true} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>{props.title.toString()}</Modal.Title>
          <CloseButton onClick={props.handleClose} aria-label="Hide" />
        </Modal.Header>

        <Modal.Body>
        <Portlet>
          <Row>
            <Col>

              <CustomSelectBarang readonly={isLocked} setSelected={getBarangSelected} initialValue={initSelected} itemList={props.barangList} label={"Barang"}/>
              <div className='form-error'>{errorForm}</div>

              <DividerText variant='l'>Daftar Barang</DividerText>
          
              {/* <Button variant="primary">Add Barang</Button> */}
              {
                <Table className="my-3" id='data-table' striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Roll</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataBarang.map((barang,index)=>{
                        return(
                          <tr key={index}>
                            <td className="text-center">
                              {
                                !isLocked ? 
                                <CellInput 
                                  value={(barang.qty == 0 ? '' : barang.qty)} 
                                  tabIndex={(index*2)}
                                  placeholder="0" 
                                  onKeyDown={(e)=>nextInput(e.key, (index*2))} 
                                  onChange={(e)=>editQty(index, e.target.value)}
                                  onBlur={()=>{cekQty(index)}}
                                  onClick={()=>initNumpad(index, 'qty')}
                                  />
                                :
                                <span>{barang.qty}</span>
                              }
                            </td>
                            <td className="text-center">
                              {
                                !isLocked ? 
                                  <CellInput 
                                    value={(barang.roll == 0 ? '' : barang.roll)} 
                                    tabIndex={(index*2)+1}
                                    placeholder="0" 
                                    onKeyDown={(e)=>nextInput(e.key, (index*2)+1)}  
                                    onChange={(e)=>editRoll(index,e.target.value)}
                                    onBlur={()=>cekRoll(index)}
                                    />
                                :
                                <span>{barang.roll}</span>

                              }
                            </td>
                            <td style={{verticalAlign:"middle"}} className="fs-5 text-center">
                              <label>
                                {barang.qty * barang.roll}
                              </label>
                            </td>
                            {
                              !isLocked ? 
                                <td>
                                  {(barang.qty * barang.roll) != 0 || (index != dataBarang.length - 1) ? 
                                    <span style={{color:"red",cursor:"pointer"}} onClick={()=>removeRow(index)}><FaTimes/></span>
                                    : <></>
                                  }
                                </td>
                                :<></>
                            }
                          </tr>
                        )
                      })
                    }
                  </tbody>
                  <tfoot>
                    <tr className="fs-5">
                      <th className="text-center">TOTAL </th>
                      <th className="text-center">{totalRoll}</th>
                      <th className="text-center">{totalQty}</th>
                    </tr>
                  </tfoot>
                </Table>
              }
                <div>{curVal.current}</div>


              {
                isLocked 
                ? 
                  <Alert variant="warning">
                    Dengan menyimpan data, maka program akan men'generate' no Barcode. <br/>
                    Jika ingin melanjutkan meyimpan data. Mohon input PIN anda


                  </Alert>
                :<></>
              }
            </Col>
          </Row>
        </Portlet>


      </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"  onClick={props.handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={()=>wrapData()}>
            <FaSave/> Save Data
          </Button>
        </Modal.Footer>
        
      </Modal>

      
      {/* {(loading) && <Loader text={"saving..."}/>} */}

    </>
  )
}
