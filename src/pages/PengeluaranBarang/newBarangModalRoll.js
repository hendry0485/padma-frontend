// import { useState } from "react"

import { useState, useEffect, useRef } from "react";
import { Table, Button, Row, Col, Modal, 
  CloseButton, Alert, ListGroup, Form,
  FloatingLabel} from "react-bootstrap";
import { FaTrash, FaSave } from 'react-icons/fa';
import { BiNoEntry } from 'react-icons/bi';
import Loader from "../../components/loader";
import { FiLoader } from 'react-icons/fi';
import Portlet from "../../components/portlet";
import { styled } from "styled-components";
import CustomSelectBarang from "../../components/customSelectBarang";
import DividerText from "../../components/dividerText";
import brcd from '../../images/brcd.gif'



const CellInput = styled.input`
  width:100%;
  max-width:100px;
  padding:5px;
  height:30px;
  text-align:center;
`

const InfoRoll = styled.div`
  position:absolute;
  right:0px;
  top:0px;
  width:80px;
  text-align:center;
  padding:10px;
  height:100%;
  background:#eee;
`

const RemoveRollBtn = styled.button`
  position:absolute;
  top:0px;
  right:0px;
  color:red;
  border:none;
  background:transparent;
  font-size:12px;
` 



export default function PenerimaanBarangBaru(props) {

  const styleRemove = {
    background:'lightpink',
    position:"relative",
    cursor:'no-drop',
    position:"relative"
  };

  const listRef = useRef(null);
  const [inputCode, setInputCode] = useState('');
  const [dataBarang, setDataBarang] = useState([]);
  const [isChecking, setIsChecking] = useState(false)
  const [totalQty, setTotalQty] = useState(0)
  const [totalRoll, setTotalRoll] = useState(0)

  let initSelected = {};
  if (typeof props.dataBarang.barang_id !== 'undefined' && props.dataBarang.barang_id !== '') {
    initSelected = props.barangList.filter(barang=>barang.id == props.dataBarang.barang_id)[0];
  }
  const [barangSelected, setBarangSelected] = useState(initSelected);
  
  const [errorForm, setErrorForm] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const getBarangSelected = (value) => { 
    console.log(value);
    setBarangSelected(value);
    if (typeof value.id === 'undefined') {
      setErrorForm("Required");
    }else{
      setErrorForm("");
    }
  }

  const seekCode = (el) => {
    const val = el.target.value;
    setInputCode(val);
    if(val.length === 13){
      setIsChecking(true)
      setTimeout(() => {
        setInputCode('');
        setIsChecking(false);
      }, 500);

      const nList = [...dataBarang];
      
      nList.push({
        qty:(Math.random() * 100).toFixed(0),
        flag:-1
      });
      setDataBarang(nList);
    }
  }


  const countTotal = () =>{
    
    let totalQtyNew = 0;
    let totalRollNew = 0;
    dataBarang.forEach(list => {
      if(list.qty != ''){
        totalRollNew++;
        totalQtyNew += parseFloat(list.qty);
      }
    });
    setTotalRoll(totalRollNew);
    setTotalQty(totalQtyNew);
  }

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
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

              <CustomSelectBarang readonly={(dataBarang.length ? true  : false)} setSelected={getBarangSelected} initialValue={initSelected} itemList={props.barangList} label={"Barang"}/>

              <FloatingLabel label="Scan/Inpit Kode" className="mb-3">
                <Form.Control 
                  value={inputCode} 
                  onChange={(e)=>seekCode(e)}
                  readOnly={(barangSelected.id ? false : true)}
                  style={{
                    backgroundColor:(barangSelected.id ? 'white' : '#ddd')
                  }}
                  />
              </FloatingLabel>

            <DividerText variant='l'>Daftar Barang</DividerText>


                <ListGroup ref={listRef} style={{maxHeight: '375px', overflowY:'scroll'}}>
                
                  {dataBarang.map((barang, index)=>{
                    return (
                      <ListGroup.Item className="mb-1"  key={index} style={(barang.flag == 0 ? styleRemove : {position:"relative"})}>
                        <div className="mb-1" style={(barang.flag == 0 ? { filter:'blur(2px)'} : {})}>
                          <img style={{width:"calc(100% - 80px)"}} src={brcd} alt="logo" />
                        </div>
                        <InfoRoll className="fs-3 pt-3">
                          {barang.flag ? barang.qty : <s>{barang.qty}</s>}
                        </InfoRoll>
                        <RemoveRollBtn>{(barang.flag ? <FaTrash/> : <BiNoEntry/>)} </RemoveRollBtn>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>

                <ListGroup className="fs-5">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <div>QTY</div>
                    <div>{totalQty}</div> 
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <div>ROLL</div>
                    <div>{totalRoll}</div> 
                  </ListGroup.Item>
                </ListGroup>


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

        {
          isChecking &&
          <Loader text={'checking...'} />
        }

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
