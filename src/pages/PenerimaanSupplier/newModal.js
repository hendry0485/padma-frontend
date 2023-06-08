// import { useState } from "react"

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import {Form, Button, FloatingLabel, Modal, CloseButton, Alert} from "react-bootstrap";
import { BsBuilding } from 'react-icons/bs';
import { FaWarehouse, FaSave } from 'react-icons/fa';
import { GrDocumentText } from 'react-icons/gr';
import { NavLink, useNavigate } from "react-router-dom";
import DatepickerFloating from "../../components/datepickerFloating";
import UseAxios from "../../customHooks/useAxios";
import Loader from "../../components/loader";



export default function PenerimaanBaru(props) {
  const getDate = new Date();
  const today = (getDate.getDate() < 10 ? '0'+getDate.getDate() : getDate.getDate() )+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  
  const navigate = useNavigate();

  const [tanggal, setTanggal] = useState(today);
  const [fetchParams, setFetchParams] = useState({
    method:"",
    url:"",
    params: {}
  })

//=================axios==========
  
  const {response, error , loading} = UseAxios(fetchParams);

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

  const nData = {
    kode_transaksi_id: "",
    no_transaksi: "",
    tgl_transaksi: "",
    no_ref: "",
    nama: "",
    user_id: 1,
    user_nama: "",
    gudang_id: 1,
    gudang_nama: "",
    catatan: null,
    status: 1,
    created_by: null,
    created_at: null,
    updated_by: null,
    updated_at: null,
    total_item: 0,
    total_unit: 0,
    total_qty: 0,
    detail: []
  };
  const formik = useFormik({
    initialValues:{
      supplier:'',
      gudang:'',
      noRef:'',
      tanggal:today,
    },
    validate,
    onSubmit : (values) => {
      nData.tgl_transaksi = values.tanggal;
      nData.nama = props.supplierList[values.supplier].nama;
      nData.no_ref = values.noRef;
      nData.gudang_id = props.gudangList[values.gudang].id;
      nData.gudang_nama = props.gudangList[values.gudang].nama;
      
      setFetchParams({
        method:"post",
        url:"/transaksi",
        data: nData
      })
    },
  });

  
  useEffect(() => {
    if (response !== null) {
      navigate(`/penerimaan-supplier/${response.id}`,{replace:true});
    }
  }, [response]);
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
        {/* {error.message > 0 ? <Alert variant="danger">
                                {error.message}
                            </Alert> : <></>} */}
        <Form onSubmit={formik.handleSubmit}>
          {/* tanggal */}
          <DatepickerFloating setDateValue={getTanggal} tanggal={today}/>
          {formik.errors.tanggal}
          
          <br/>

          {/* supplier */}
          <FloatingLabel label="Supplier">
            <Form.Select 
              name="supplier"
              value={formik.values.supplier}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} 
              >
              <option value="">Pilih</option>
              {props.supplierList.map((supplier,index)=>{
                return(
                  <option key={index} value={index}>{supplier.nama}</option>
                )
              })}
            </Form.Select>
          </FloatingLabel>
          {formik.errors.supplier ? <div className='form-error'>{formik.errors.supplier}</div> : null}
          <br/>
          {/* no referensi */}
          <FloatingLabel label="No Referensi">
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
          <FloatingLabel label="Gudang">
            <Form.Select 
              name="gudang"
              value={formik.values.gudang}
              onBlur={formik.handleBlur} 
              onChange={formik.handleChange} 
              id="gudangSelect">
              <option value="">Pilih</option>
              {props.gudangList.map((gudang,index)=>{
                return(
                  <option key={index} value={index}>{gudang.nama}</option>
                )
              })}
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
      
      {(loading) && <Loader text={"saving..."}/>}

    </>
  )
}
