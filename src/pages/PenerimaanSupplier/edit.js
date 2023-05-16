// import { useState } from "react"

import { Formik } from "formik";
import { useState } from "react";
import {Form, ListGroup, Button, Row, Col, Modal, CloseButton, Card, FloatingLabel} from "react-bootstrap";
import { BsBuilding } from 'react-icons/bs';
import { FaWarehouse, FaSave, FaTimes } from 'react-icons/fa';
import { GrDocumentText } from 'react-icons/gr';
import Datepicker from "../../components/datepicker";
import { NavLink } from "react-router-dom";
import BreadcrumbBar from "../../components/breadcrumb";
import NewPenerimaan from "./newModalLegacy";


export default function Daftar(props) {
  const getDate = new Date();
  const today = getDate.getDate()+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  const initialValues = {tanggal:today};
  const [tanggalFilter, setTanggalFilter] = useState(today);
  const [isFilterChange, setIsFilterChange] = useState(false)

  function getTanggalFilter(value){
    setIsFilterChange(true);
    setTanggalFilter(value); 
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <BreadcrumbBar breadcrumb={props.breadcrumb} />
      {/* <Row>
        <Col>
          <div className="col d-block d-sm-none" id="mainTitleForm" >
            {props.title.toString()}
          </div>
        </Col>

        <div className="col-xs">
          <div className="d-none d-sm-block mt-2 fw-bold fs-3">{props.title.toString().toUpperCase()}</div>
        </div>
      </Row> */}

      <h3>{props.title.toString()}</h3>

      <FloatingLabel controlId="floatingTanggal" label="tanggal">
        <Form.Control plaintext readOnly  type="text" value="12/05/2023" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSupplier" label="supplier">
        <Form.Control plaintext readOnly  type="text" value="PT. KAHATEXT (Cijerah)" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingRef" label="supplier">
        <Form.Control plaintext readOnly  type="text" value="Y23021" />
      </FloatingLabel>

      <FloatingLabel controlId="floatingGudang" label="supplier">
        <Form.Control plaintext readOnly  type="text" value="Toko" />
      </FloatingLabel>

      <Card>
        <Card.Body>
          <Card.Title>Data Penerimaan</Card.Title>
          <Card.Text>
              
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
