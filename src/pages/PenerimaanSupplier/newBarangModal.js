// import { useState } from "react"

import { useState, useEffect } from "react";
import {Form, Button, FloatingLabel, Modal, CloseButton, Alert} from "react-bootstrap";
import { BsBuilding } from 'react-icons/bs';
import { FaWarehouse, FaSave } from 'react-icons/fa';
import { GrDocumentText } from 'react-icons/gr';
import { NavLink, useNavigate } from "react-router-dom";
import DatepickerFloating from "../../components/datepickerFloating";
import UseAxios from "../../customHooks/useAxios";
import Loader from "../../components/loader";

import { styled } from "styled-components";

const CellInput = styled.input`
  width:100%;
  max-width:100px;
  padding:5px;
  text-align:center;
`


export default function PenerimaanBarangBaru(props) {
  const [dataBarang, setDataBarang] = useState([]);
  
  return (
    <>
      <Modal show={true} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>{props.title.toString()}</Modal.Title>
          <CloseButton onClick={props.handleClose} aria-label="Hide" />
        </Modal.Header>

        <Modal.Body>
        <Portlet>
          <Row>
            <Col>
              {/* <Button variant="primary">Add Barang</Button> */}
              {
                <Table className="my-3" striped bordered hover size="sm">
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
                          <tr  key={index}>
                            <td>
                              <CellInput placeholder="0" onChange={(e)=>setNewQty(e.target.value)}/>
                            </td>
                            <td>
                              <CellInput placeholder="0" onChange={(e)=>setNewRoll(e.target.value)}/>
                            </td>
                            <td>
                              <CellInput readOnly value={barang.qty}/>
                            </td>
                          </tr>
                        )
                      })
                    }
                    <tr>
                      <td colSpan="3" >
                        <div className="d-grid">
                          <Button  variant="primary">Add Barang</Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot></tfoot>
                </Table>
              }
            </Col>
          </Row>
        </Portlet>
      </Modal.Body>

      <Modal.Footer>
          <Button variant="secondary"  onClick={props.handleClose}>
            Close
          </Button>
          <Button type="submit" disabled={formik.isSubmitting} onClick={formik.handleSubmit} variant="primary">
            <FaSave/> Save Data
          </Button>
        </Modal.Footer>
      </Modal>
      
      {(loading) && <Loader text={"saving..."}/>}

    </>
  )
}
