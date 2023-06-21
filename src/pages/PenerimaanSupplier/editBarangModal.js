import { useRef, useState, useEffect } from "react"
import { Modal, FloatingLabel, CloseButton, Button, Row, Col, Form, ListGroup } from "react-bootstrap";
import DividerText from "../../components/dividerText";
import CustomSelectBarang from "../../components/customSelectBarang";
import { FaTrash, FaSave, FaPrint } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { BiNoEntry } from 'react-icons/bi';
import Portlet from "../../components/portlet";
import { styled } from "styled-components";
import brcd from '../../images/brcd.gif'

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

export default function EditBarangModal(props) {
  const styleRemove = {
    background:'lightpink',
    position:"relative",
    cursor:'no-drop',
    position:"relative"
  };
  

  const listRef = useRef(null);
  const [dataTemp, setDataTemp] =  useState("", props.dataEdit);
  const [newQty, setNewQty] = useState(0)

  let initSelected = {};
  if (typeof props.dataEdit.barang_id !== 'undefined' && props.dataEdit.barang_id !== '') {
    initSelected = props.barangList.filter(barang=>barang.id == props.dataEdit.barang_id)[0];
  }
  const [barangSelected, setBarangSelected] =  useState(initSelected);

  const [dataBarang, setDataBarang] = useState(props.dataEdit.detail);
  const [errorForm, setErrorForm] = useState('');

  const getBarangSelected = (value) => {
    setBarangSelected(value)
    if (typeof value.id === 'undefined') {
      setErrorForm("Required");
    }else{
      setErrorForm("");
    }
  }

  const addDetail = () => {
    const nList = [...dataBarang];
    nList.push({
      qty:newQty,
      flag:1
    });
    setNewQty(0);
    setDataBarang(nList)
  }

  const wrapData = () => {
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

  useEffect(() => {          
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [dataBarang]);


  return (
    <Modal show={true} fullscreen={true} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>{props.title.toString()}</Modal.Title>
          <CloseButton onClick={props.handleClose} aria-label="Hide" />
        </Modal.Header>

        <Modal.Body>
        <Portlet>
          <Row>
            <Col>
              {/* <DividerText variant='l'>Daftar Barang</DividerText> */}

              <FloatingLabel controlId="floatingTanggal" label="barang">
              {
                barangSelected != null ? 
                <Form.Control plaintext readOnly className="fs-2 mb-4" type="text" value={barangSelected.nama} />
                : <FiLoader/>
              }
              </FloatingLabel>
              
              <ListGroup ref={listRef} style={{maxHeight: '375px', overflowY:'scroll'}}>
                
                {dataBarang.map((barang, index)=>{
                  console.log(barang, barang.flag === 0)
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
              <ListGroup>
                <ListGroup.Item className="my-2" style={{padding:'0px'}}></ListGroup.Item>
                  <ListGroup.Item className="mb-1" style={{background:'#eee',position:"relative", height:'75px'}}>
                    <div className="mb-1 pt-2">
                      
                      <input 
                        className='text-center fs-3'
                        style={{width:'150px'}} 
                        placeholder="add new"
                        value={(newQty == 0 ? '' : newQty)}
                        onChange={(e)=>setNewQty(e.target.value)}
                         />
                    </div>
                    <InfoRoll className="fs-3">
                      <Button 
                        onClick={addDetail}
                        style={{
                          width:'51px',
                          height:'50px',
                          borderRadius:'0 0 3px 0',
                        }} 
                        disabled={(!newQty ? true : false)}
                        ><FaSave/></Button>
                    </InfoRoll>

                  </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Portlet>


      </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"  onClick={props.handleClose}>
            Close
          </Button>
          <Button type="submit" disabled={dataBarang.length ? false : true} variant="warning" onClick={()=>wrapData()}>
            <FaPrint/> Print Barcode
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
