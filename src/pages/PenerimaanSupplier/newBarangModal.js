// import { useState } from "react"

import { useState, useEffect, useRef } from "react";
import { Table, Button, Row, Col, Modal, CloseButton, Alert, Form} from "react-bootstrap";
import { BsBuilding } from 'react-icons/bs';
import { FaTimes, FaSave } from 'react-icons/fa';
import Portlet from "../../components/portlet";
import { styled } from "styled-components";
import CustomSelectBarang from "../../components/customSelectBarang";
import DividerText from "../../components/dividerText";
import Numhelp from "../../components/numhelp";
import useLocalStorage from "../../customHooks/useLocalStorage";
import UseAxios from "../../customHooks/useAxios";


const CellInput = styled.input`
  width:100%;
  max-width:100px;
  padding:5px;
  height:30px;
  text-align:center;
`


export default function PenerimaanBarangBaru(props) {
  
  const [dataTemp, setDataTemp] = useLocalStorage("data-temp", props.dataBarang);
  const prevData = props.dataBarang.data;
  if (prevData[(prevData.length-1)].qty != 0 ) {
    prevData.push({
      qty:0
    })
  }
  const [dataBarang, setDataBarang] = useState(prevData);
  const [totalQty, setTotalQty] = useState(0)
  const [totalRoll, setTotalRoll] = useState(0)
  const [showNumhelp, setShowNumhelp] = useState(true)

  let initSelected = {};
  if (typeof props.dataBarang.barang_id !== 'undefined' && props.dataBarang.barang_id !== '') {
    initSelected = props.barangList.filter(barang=>barang.id == props.dataBarang.barang_id)[0];
  }
  const [barangSelected, setBarangSelected] = useState(initSelected);
  const [errorForm, setErrorForm] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);
  const [keyVal, setKeyVal] = useState("");
  const curVal = useRef('');

  //=====================================================================
  const [fetchParams, setFetchParams] = useState({
    method:"",
    url:"",
    params: {}
  });
 
  const {response: data, error , loading} = UseAxios(fetchParams);
  //=====================================================================


  const getBarangSelected = (value) => {
    setBarangSelected(value)
    if (typeof value.id === 'undefined') {
      setErrorForm("Required");
    }else{
      setErrorForm("");
    }
  }

  const getKeyVal = async (value) => {
    curVal.current = value;
    await editQty(rowIndex, value);
    await setRowIndex(rowIndex+1);
  }

  const editQty = (index, value) =>{
    const nList = [...dataBarang];
    nList[index].qty = value;
    const l = nList.length - 1 ;
    if (nList[l].qty != 0 ) {
      nList.push({
        qty:0
      });
    }
    
    if (typeof barangSelected.id === 'undefined') {
      setErrorForm("Required");
    }

    setDataBarang(nList);
  }
  
  const editRoll = (index, value) =>{
    const nList = [...dataBarang];
    nList[index].roll = value;
    setDataBarang(nList);
  }

  const nextInput = (key, index) => {
    const tbl = document.querySelector(`#data-table`);
    if(key === "Enter" && index < (dataBarang.length) ){
      console.log(index);
      if (typeof tbl.querySelector(`[tabindex="${index+2}"]`) != null) {
        tbl.querySelector(`[tabindex="${index+2}"]`).focus();
      }
    }
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
        totalRollNew++;
        totalQtyNew += parseFloat(list.qty);
      }
    });
    setTotalRoll(totalRollNew);
    setTotalQty(totalQtyNew);
  }

  
  

  const removeRow = (rIndex) => {
    const nList= dataBarang.filter((barang,index)=>index != rIndex);
    setRowIndex(nList.length-1);
    setDataBarang(nList);
  }

  useEffect(() => {
    countTotal();
    // console.log(barangSelected);
    setDataTemp({
      id:props.data_id,
      barang_id:barangSelected.id,
      data:dataBarang
    });
  }, [dataBarang, barangSelected]);

  const wrapData = () => {
    setIsLocked(true);
    const bs = barangSelected;
    const nList = [];
    const nowList = dataBarang.filter(barang=>barang.qty > 0)
    setDataBarang(nowList);
    dataBarang.forEach((barang, index) => {
      if (barang.qty > 0) {
        nList.push({
          nama:bs.nama,
          barang_id:bs.id,
          barang_nama:bs.nama,
          warna_id:bs.warna_id,
          warna_nama:bs.warna_nama,
          qty:barang.qty,
          roll:1,
        })
      }
    });

    props.dataSet.detail = nList;
    
    setFetchParams({
      method:"put",
      url:`/transaksi/${props.data_id}`,
      data:props.dataSet
    })

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
            <DividerText variant='l'>Daftar Barang</DividerText>

              <CustomSelectBarang readonly={isLocked} initialValue={initSelected} setSelected={getBarangSelected} itemList={props.barangList} label={"Barang"}/>
              <div className='form-error'>{errorForm}</div>

          
              {/* <Button variant="primary">Add Barang</Button> */}
              {
                <Table className="my-3" id='data-table' striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-center">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataBarang.map((barang,index)=>{
                        return(
                          <tr key={index}>
                            <td className="text-center">{index+1}</td>
                            <td className="text-center">
                              {
                                !isLocked ? 
                                <CellInput 
                                  type="number"
                                  value={(barang.qty == 0 ? '' : barang.qty)} 
                                  tabIndex={index+1}
                                  placeholder="0" 
                                  onKeyDown={(e)=>nextInput(e.key, (index))} 
                                  onChange={(e)=>editQty(index, e.target.value)}
                                  onBlur={()=>{cekQty(index)}}
                                  onClick={()=>{setRowIndex(index); setShowNumhelp(true)}}
                                  />
                                :
                                <span>{barang.qty}</span>
                              }
                            </td>
                            {
                              !isLocked ? 
                                <td className="text-center">
                                  {(barang.qty) != 0 || (index != dataBarang.length - 1) ? 
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
                      <th className="text-center">T</th>
                      <th className="text-center">{totalQty}</th>
                    </tr>
                  </tfoot>
                </Table>
              }


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
              showNumhelp &&
              <Numhelp handleClose={()=>setShowNumhelp(false)} returnVal={getKeyVal}/>
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
