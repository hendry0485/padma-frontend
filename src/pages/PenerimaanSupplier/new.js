// import { useState } from "react"

import { Formik, useFormik } from "formik";
import { useState } from "react";
import {Form, Button, InputGroup, Row, Col} from "react-bootstrap";
import { BsBuilding } from 'react-icons/bs';
import { FaWarehouse, FaSave, FaTimes } from 'react-icons/fa';
import { GrDocumentText } from 'react-icons/gr';
import { NavLink } from "react-router-dom";
import Datepicker from "../../components/datepicker";

export default function PenerimaanBaru(props) {
  const getDate = new Date();
  const today = getDate.getDate()+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  
  const [supplier, setSupplier] = useState("");
  const [tanggal, setTanggal] = useState(today);
  const [gudang, setGudang] = useState("");
  const [noRef, setNoRef] = useState("");
  const [isFilterChange, setIsFilterChange] = useState(false)

//=================formik==========
  const validate = values => {
    const errors = {}; 
    if (!values.tanggal) {
      errors.tanggal = 'Required';
    } 

    if (!values.supplier) {
      errors.supplier = 'Required';
    }

    if (!values.gudang) {
      errors.gudang = 'Required';
    }

    if (!values.noRef) {
      errors.noRef = 'Required';
    }

    return errors;
  }
  const formik = useFormik({
    initialValues:{
      tanggal: tanggal,
      supplier: '',
      gudang: '',
      noRef: '',
    },
    validate,
    onSubmit : (values,{setSubmitting}) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    },
  });
//=================================
  function getTanggal(value){
    setTanggal(value); 
    formik.values.tanggal=value;
  }

  
  return (
    <>
      <Row>
        <Col>
          <div className="col d-block d-sm-none" id="mainTitleForm" >
            {props.title.toString()}
          </div>
        </Col>

        <div className="col-xs">
          <div className="d-none d-sm-block mt-2 fw-bold fs-3">{props.title.toString().toUpperCase()}</div>
        </div>
      </Row>

      <Row>
        <Col
          className="pt-4"
          xs={12} 
          md={4}
          >
          <Form onSubmit={formik.handleSubmit}>
            {/* tanggal */}
            <Datepicker setDateValue={getTanggal} tanggal={tanggal}/>
            {formik.errors.tanggal}
            

            {/* supplier */}
            <InputGroup className="mt-3">
              <InputGroup.Text><BsBuilding/></InputGroup.Text>
              <Form.Select 
                name="supplier"
                value={formik.values.supplier}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange} 
                id="supplierSelect">
                <option value="">Pilih</option>
                <option value="1">Kahatex (Cijerah)</option>
                <option value="2">Kahatex (Rancaekek) </option>

              </Form.Select>
            </InputGroup>
            {formik.errors.supplier ? <div className='form-error'>{formik.errors.supplier}</div> : null}

            {/* no referensi */}
            <InputGroup className="mt-3">
              <InputGroup.Text><GrDocumentText/></InputGroup.Text>
              <Form.Control 
                    value={formik.values.noRef}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="noRef"
                    // onChange={(e)=>{setNoRef(e.target.value)}}
                    type="input"
                    lang="id-ID"
                    id="referensi"
                    placeholder="no ref"
                  />
            </InputGroup>
            {formik.errors.noRef ? <div className='form-error'>{formik.errors.noRef}</div> : null}

            {/* gudang */}
            <InputGroup className="mt-3">
              <InputGroup.Text><FaWarehouse/></InputGroup.Text>
              <Form.Select 
                name="gudang"
                value={formik.values.gudang}
                onBlur={formik.handleBlur} 
                onChange={formik.handleChange} 
                id="gudangSelect">
                <option value="">Pilih</option>
                <option value="1">Toko</option>
                <option value="2">gudang </option>
              </Form.Select>
            </InputGroup>
            {formik.errors.gudang ? <div className='form-error'>{formik.errors.gudang}</div> : null}
            

            <Row>
              <Col xs={6} className="d-grid">
                <Button type="submit" disabled={formik.isSubmitting} className='mt-4' size="md" variant="success ">
                  <FaSave/> Save 
                </Button>
              </Col>
              <Col xs={6} className="d-grid">
                <Button className='mt-4' size="md" variant="secondary">
                  <FaTimes/> CANCEL
                </Button>
              </Col>
            </Row>
          </Form>
            
        </Col>
      </Row>
      
    </>
  )
}
