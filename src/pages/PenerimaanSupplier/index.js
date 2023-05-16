// import { useState } from "react"

import { Formik } from "formik";
import { useState } from "react";
import {Form, ListGroup, Badge, Button, InputGroup, Row, Col} from "react-bootstrap";
import { BsBuilding, BsSearch } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import Datepicker from "../../components/datepicker";
import { NavLink } from "react-router-dom";
import BreadcrumbBar from "../../components/breadcrumb";
import NewPenerimaan from "./newModal";
import Portlet from "../../components/portlet";
import PageTitle from "../../components/pageTitle"

export default function Daftar(props) {
  const getDate = new Date();
  const today = getDate.getDate()+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  const [tanggalFilter, setTanggalFilter] = useState(today);
  const [isFilterChange, setIsFilterChange] = useState(false)

  function getTanggalFilter(value){
    setIsFilterChange(true);
    setTanggalFilter(value); 
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const testArr = Array.from(Array(10).keys());
  
  return (
    <>
      <BreadcrumbBar breadcrumb={props.breadcrumb} />

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
            <Form >
                <>
                  <Datepicker setDateValue={getTanggalFilter} tanggal={tanggalFilter}/>
                  <InputGroup className="mt-3">
                    <InputGroup.Text><BsBuilding/></InputGroup.Text>
                    <Form.Select id="supplierSelect">
                      <option value="">Semua</option>
                      <option value="1">Kahatex (Cijerah)</option>
                      <option value="2">Kahatex (Rancaekek) </option>
                    </Form.Select>
                  </InputGroup>
                  <div className="d-grid gap-2">
                    <Button className='mt-3' size="md" variant={(!isFilterChange ? "secondary" : "warning")}>
                      <BsSearch/> Cari
                    </Button>
                  </div>
                </>
            </Form>
              {/* <NavLink  className='col d-grid' as="Button" to="/penerimaan-supplier/new">
                <Button className='mt-3' size="md" variant="primary">
                  Penerimaan Baru
                </Button>
              </NavLink> */}

              <div  className='col d-grid'>
                <Button onClick={()=>{setShow(true)}} className='col mt-3' size="md" variant="primary">
                  Penerimaan Baru [Modal]
                </Button>
              </div>
          </Col>
        </Row>
      </Portlet>
      <Portlet>
        <Row>
        <Col 
            className="pt-4"
            xs={12} 
            md={8}
            >
            <Form.Control 
                    type="search"
                    id="searcInput"
                    className="form-control-sm text-center"
                    placeholder="filter.."
                  />
            <ListGroup as="ol" className="listdiv">
              {
                testArr.map((val, index)=>{
                  return(

                      <ListGroup.Item 
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        > 
                        <div className="px-2">
                          <div className="fw-bold">Y3021</div>
                          <small>PT. KAHATEX (Cijerah)</small>
                        </div>
                        <div className="px-2">
                          <b>1000</b> Yard <br/> 10 Roll
                          
                        </div>
                        <div className="">
                          <NavLink as="Button" to="/penerimaan-supplier/edit">
                            <Button size="sm" variant="secondary"><FaEdit/></Button>
                          </NavLink>
                        </div>
                      </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
            
          </Col>
        </Row>
      </Portlet>


      {
        show && 
        <NewPenerimaan title="Form Penerimaan Baru" show={show} handleShow={handleShow} handleClose={handleClose}/>
      }
    </>
  )
}
