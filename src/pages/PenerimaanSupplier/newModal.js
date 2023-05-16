// import { useState } from "react"

import { useFormik } from "formik";
import { useState } from "react";
import {Form, Button, FloatingLabel, Modal, CloseButton} from "react-bootstrap";
import { BsBuilding } from 'react-icons/bs';
import { FaWarehouse, FaSave } from 'react-icons/fa';
import { GrDocumentText } from 'react-icons/gr';
import { NavLink } from "react-router-dom";
import DatepickerFloating from "../../components/datepickerFloating";

export default function PenerimaanBaru(props) {
  const getDate = new Date();
  const today = getDate.getDate()+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  
  const [tanggal, setTanggal] = useState(today);

  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Modal show={true} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>{props.title.toString()}</Modal.Title>
          <CloseButton onClick={props.handleClose} aria-label="Hide" />
        </Modal.Header>

        <Modal.Body>

        <Form onSubmit={formik.handleSubmit}>
          {/* tanggal */}
          <DatepickerFloating setDateValue={getTanggal} tanggal={tanggal}/>
          {formik.errors.tanggal}
          
          <br/>

          {/* supplier */}
          <FloatingLabel controlId="floatingSupplier" label="Supplier">
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
          </FloatingLabel>
          {formik.errors.supplier ? <div className='form-error'>{formik.errors.supplier}</div> : null}
          <br/>
          {/* no referensi */}
          <FloatingLabel controlId="floatingRef" label="No Referensi">
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
          </FloatingLabel>
          {formik.errors.noRef ? <div className='form-error'>{formik.errors.noRef}</div> : null}

          <br/>
          {/* gudang */}
          <FloatingLabel controlId="floatingGudang" label="Gudang">
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
          </FloatingLabel>
          {formik.errors.gudang ? <div className='form-error'>{formik.errors.gudang}</div> : null}
        </Form>
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
      
    </>
  )
}
