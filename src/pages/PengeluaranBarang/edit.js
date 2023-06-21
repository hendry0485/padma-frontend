import { useEffect, useState } from "react"

import {Form, Row, Col, Card, FloatingLabel, Button, Table, ListGroup} from "react-bootstrap";
import { FiLoader } from 'react-icons/fi';
import { NavLink, useParams } from "react-router-dom";
import Portlet from "../../components/portlet";
import PageTitle from "../../components/pageTitle"
import UseAxios from "../../customHooks/useAxios";
import NewBarangModal from "./newBarangModalRoll";
import EditBarangModal from "./editBarangModal";
import { styled } from "styled-components";


const InfoRoll = styled.div`
  position:absolute;
  right:0px;
  top:0px;
  width:60px;
  text-align:center;
  padding:10px;
  height:100%;
  background:lightgreen;
`


export default function Daftar(props) {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [dataBarang, setDataBarang] = useState([]);
  // const [rowLength, setRowLength] = useState(2);

  const {response:barangList , error:errorBarang, loading:loadingBarang} = UseAxios({
    method:"get",
    url:"/barang"
  });

  // const getDate = new Date();
  // const today = getDate.getDate()+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //===========================================
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [editData, setEditData] = useState([]);

  const editFunc = (index) => {
    setEditData(dataBarang[index]);
    handleShowEdit();
  }

  //===========================================
 
  const {response, error , loading} = UseAxios({
    method:"get",
    url:"/transaksi",
    params: {
      id:id
    }
  });

  useEffect(() => {
    if (response !== null) {
      setData(response[0]);
      groupData();
    }
  }, [response]);  

  const groupData = () => {
    const mList = {};
    const nList = [];
    if(data !== null){
      data.detail.forEach((barang, index) => {
        if (typeof mList[`s-`+barang.barang_id] === 'undefined') {
          mList[`s-`+barang.barang_id] = nList.length;
          nList.push({
            barang_id : barang.barang_id,
            barang_nama : barang.barang_nama,
            qty:0,
            roll:0,
            detail:[]
          })
        }
        if (barang.flag == 1) {
          nList[mList[`s-`+barang.barang_id]].qty += parseFloat(barang.qty);
          nList[mList[`s-`+barang.barang_id]].roll++;
        }
        nList[mList[`s-`+barang.barang_id]].detail.push({'qty':barang.qty,'flag':barang.flag});
      });
      setDataBarang(nList);
    }
  }

  
  return (
    <>
      <PageTitle>
        {props.title.toString()}

        <div className="col-xs">
          <div className="d-none d-sm-block mt-2 fw-bold fs-3">{props.title.toString().toUpperCase()}</div>
        </div>
      </PageTitle>
      
      <Portlet>
        <Row>
          <Col
            className="pt-4" 
            xs={12} 
            md={4}
            >

            <FloatingLabel controlId="floatingTanggal" label="tanggal">
              {
                data != null ? 
                <Form.Control plaintext readOnly  type="text" value={data.tgl_transaksi} />
                : <FiLoader/>
              }
            </FloatingLabel>

            <FloatingLabel controlId="floatingSupplier" label="Supplier">
              {
                data != null ? 
                <Form.Control plaintext readOnly  type="text" value={data.nama} />
                : <FiLoader/>
              }
            </FloatingLabel>

            <FloatingLabel controlId="floatingRef" label="No Referensi">
              {
                data != null ? 
                <Form.Control plaintext readOnly  type="text" value={data.no_ref} />
                : <FiLoader/>
              }
            </FloatingLabel>

            <FloatingLabel controlId="floatingGudang" label="Gudang">
              {
                data != null ? 
                <Form.Control plaintext readOnly  type="text" value={data.gudang_nama} />
                : <FiLoader/>
              }
            </FloatingLabel>
          </Col>
        </Row>
      </Portlet>

      <Portlet>
        <Row>
          <Col>
              <div style={{position:"relative"}}>
                Daftar Barang
                {
                  data !== null && 
                  <Button style={{position:"absolute",top:"-5px", right:"0"}} onClick={()=>setShow(true)} size="sm" variant="light">+ Barang</Button>
                }
              </div>

              <ListGroup className="my-3">
                {
                  dataBarang.length ?
                  dataBarang.map((barang,index)=>{
                    return(
                      <ListGroup.Item onClick={()=>editFunc(index)} className="mb-1"  key={index} style={{position:"relative", cursor:'pointer'}}>
                        <InfoRoll>
                          <span className="fs-3">{barang.roll}</span><br/>
                          <small>roll</small>
                        </InfoRoll>
                        <div className="mb-1">
                          <div className="fs-2">{barang.barang_nama}</div>
                          <small>{barang.qty} yard</small>
                        </div>
                      </ListGroup.Item>
                    )
                  }):
                  <ListGroup.Item>
                    No Data
                  </ListGroup.Item>                  
                }
                <ListGroup.Item className="mb-1" style={{position:"relative", cursor:'pointer'}}>
                      <InfoRoll >
                        <span className="fs-3">2</span><br/>
                        <small>roll</small>
                      </InfoRoll>
                      <div className="mb-1">
                        <div className="fs-2">RJN Black</div>
                        <small>232 yard</small>
                      </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="mb-1" style={{position:"relative", cursor:'pointer'}}>
                      <InfoRoll >
                        <span className="fs-3">2</span><br/>
                        <small>roll</small>
                      </InfoRoll>
                      <div className="mb-1">
                        <div className="fs-2">Heavy Taslan Forest Green</div>
                        <small>199 yard</small>
                      </div>
                  </ListGroup.Item>                  
                
              </ListGroup>
          </Col>
        </Row>
      </Portlet>

      {
        show && 
        <NewBarangModal title={"Form Barang"} data_id={id} dataBarang={data} show={show} barangList={barangList} handleShow={handleShow} handleClose={handleClose}/>
      }

      {
        showEdit && 
        <EditBarangModal title={"Form Edit Barang"} data_id={id} dataEdit={editData} dataSet={dataBarang} show={showEdit} barangList={barangList} handleShow={handleShowEdit} handleClose={handleCloseEdit}/>
      }

    </>
  )
}
