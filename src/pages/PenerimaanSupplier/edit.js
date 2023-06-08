import { useEffect, useState } from "react"

import {Form, Row, Col, Card, FloatingLabel, Button, Table} from "react-bootstrap";
import { FiLoader } from 'react-icons/fi';
import { NavLink, useParams } from "react-router-dom";
import Portlet from "../../components/portlet";
import PageTitle from "../../components/pageTitle"
import UseAxios from "../../customHooks/useAxios";


export default function Daftar(props) {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [dataBarang, setDataBarang] = useState([]);
  const [rowLength, setRowLength] = useState(2);

  // const getDate = new Date();
  // const today = getDate.getDate()+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
 
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
    }
  }, [response]);  
  
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

    </>
  )
}
